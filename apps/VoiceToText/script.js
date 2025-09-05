window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  alert("Your browser doesn't support Speech Recognition. Try using Chrome.");
} else {
  let recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let listening = false;
  let paused = false;
  let fullTranscript = '';
  let editIndex = null; // track if we are editing an existing transcript

  const output = document.getElementById('output');
  const status = document.getElementById('status');
  const languageSelect = document.getElementById('language');
  const startStopBtn = document.getElementById('startStopBtn');
  const pauseResumeBtn = document.getElementById('pauseResumeBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const saveLocalBtn = document.getElementById('saveLocalBtn');
  const clearBtn = document.getElementById('clearBtn');
  const savedList = document.getElementById('savedList');
  const deleteAllBtn = document.getElementById('deleteAllBtn');

  const updateLanguage = () => {
    const lang = languageSelect.value;
    recognition.lang = lang;
    output.style.direction = (lang.startsWith('ar') || lang.startsWith('ur')) ? 'rtl' : 'ltr';
  };

  languageSelect.addEventListener('change', () => {
    const wasListening = listening;
    if (wasListening) recognition.stop();
    updateLanguage();
    if (wasListening && !paused) recognition.start();
  });

  startStopBtn.addEventListener('click', () => {
    if (!listening) {
      updateLanguage();
      recognition.start();
      listening = true;
      paused = false;
      startStopBtn.textContent = 'Stop Listening';
      pauseResumeBtn.disabled = false;
      downloadBtn.disabled = false;
      saveLocalBtn.disabled = false;
      status.textContent = 'Status: Listening...';
    } else {
      recognition.stop();
      listening = false;
      paused = false;
      startStopBtn.textContent = 'Start Listening';
      pauseResumeBtn.disabled = true;
      downloadBtn.disabled = false;
      saveLocalBtn.disabled = false;
      pauseResumeBtn.textContent = 'Pause';
      status.textContent = 'Status: Stopped';
    }
  });

  pauseResumeBtn.addEventListener('click', () => {
    if (paused) {
      recognition.start();
      paused = false;
      pauseResumeBtn.textContent = 'Pause';
      status.textContent = 'Status: Listening...';
    } else {
      recognition.stop();
      paused = true;
      pauseResumeBtn.textContent = 'Resume';
      status.textContent = 'Status: Paused';
    }
  });

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        fullTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    output.value = fullTranscript + interimTranscript;
  };

  recognition.onerror = (event) => {
    console.error('Error:', event.error);
    status.textContent = `Error: ${event.error}`;
  };

  recognition.onend = () => {
    if (listening && !paused) recognition.start();
  };

  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([output.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  clearBtn.addEventListener('click', () => {
    fullTranscript = '';
    output.value = '';
    status.textContent = 'Status: Cleared';
    editIndex = null; // reset edit mode
  });

  // ✅ Single Save button logic (handles both save + edit)
  saveLocalBtn.onclick = () => {
    const currentText = output.value.trim();
    if (!currentText) {
      alert("Transcript is empty!");
      return;
    }

    const savedTranscripts = JSON.parse(localStorage.getItem("transcripts") || "[]");

    if (editIndex !== null) {
      // Update existing transcript
      savedTranscripts[editIndex].text = currentText;
      localStorage.setItem("transcripts", JSON.stringify(savedTranscripts));
      renderSavedTranscripts();
      alert("Transcript updated!");
      editIndex = null; // exit edit mode
    } else {
      // Save new transcript
      const timestamp = new Date().toLocaleString();
      savedTranscripts.push({ text: currentText, time: timestamp });
      localStorage.setItem("transcripts", JSON.stringify(savedTranscripts));
      renderSavedTranscripts();
      alert("Transcript saved!");
    }
  };

  // ✅ Render transcripts with inline edit/delete
  function renderSavedTranscripts() {
    savedList.innerHTML = "";
    const savedTranscripts = JSON.parse(localStorage.getItem("transcripts") || "[]");

    savedTranscripts.forEach((item, index) => {
      const li = document.createElement("li");

      const info = document.createElement("span");
      info.textContent = `[${item.time}] ${item.text.substring(0, 50)}... `;
      li.appendChild(info);

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View";
      viewBtn.addEventListener("click", () => {
        output.value = item.text;
        editIndex = null; // just viewing
      });
      li.appendChild(viewBtn);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        output.value = item.text;
        editIndex = index; // mark which transcript is being edited
      });
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        savedTranscripts.splice(index, 1);
        localStorage.setItem("transcripts", JSON.stringify(savedTranscripts));
        renderSavedTranscripts();
      });
      li.appendChild(deleteBtn);

      savedList.appendChild(li);
    });
  }

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all transcripts?")) {
      localStorage.removeItem("transcripts");
      renderSavedTranscripts();
    }
  });

  renderSavedTranscripts();
}

