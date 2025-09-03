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

  const output = document.getElementById('output');
  const status = document.getElementById('status');
  const languageSelect = document.getElementById('language');
  const startStopBtn = document.getElementById('startStopBtn');
  const pauseResumeBtn = document.getElementById('pauseResumeBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const saveToServerBtn = document.getElementById('saveToServerBtn');

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
      saveToServerBtn.disabled = false;
      status.textContent = 'Status: Listening...';
    } else {
      recognition.stop();
      listening = false;
      paused = false;
      startStopBtn.textContent = 'Start Listening';
      pauseResumeBtn.disabled = true;
      downloadBtn.disabled = false;
      saveToServerBtn.disabled = false;
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
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    fullTranscript += transcript;
    output.textContent = fullTranscript;
  };

  recognition.onerror = (event) => {
    console.error('Error:', event.error);
    status.textContent = `Error: ${event.error}`;
  };

  recognition.onend = () => {
    if (listening && !paused) recognition.start();
  };

  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([fullTranscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  saveToServerBtn.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/save-transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: fullTranscript }),
    });

    if (response.ok) {
      alert('Transcript saved to server!');
    } else {
      alert('Failed to save to server.');
    }
  });
}

