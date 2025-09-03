const currentDateDiv = document.getElementById('current-date');
const settingsSection = document.querySelector('.settings-section');
const studentEditSection = document.querySelector('.student-edit-section');
const attendanceListElement = document.getElementById('attendance-list');
const pastAttendanceSection = document.querySelector('.past-attendance-section');
const pastAttendanceListElement = document.getElementById('past-attendance-list');
const pastAttendanceDateInput = document.getElementById('past-attendance-date');
const editStudentListElement = document.getElementById('edit-student-list');
const addStudentInput = document.getElementById('add-student-input');
const calendarDiv = document.getElementById('calendar');
const organizationNameInput = document.getElementById('organization-name');
const classNameInput = document.getElementById('class-name');
const classTimingInput = document.getElementById('class-timing');
const notesTextarea = document.getElementById('notes');
const exportStartDateInput = document.getElementById('export-start-date');
const exportEndDateInput = document.getElementById('export-end-date');

// Create the new input for joined date dynamically if it doesn't exist
let addStudentJoinedDateInput = document.getElementById('add-student-joined-date');
if (!addStudentJoinedDateInput) {
    addStudentJoinedDateInput = document.createElement('input');
    addStudentJoinedDateInput.type = 'date';
    addStudentJoinedDateInput.id = 'add-student-joined-date';
    addStudentJoinedDateInput.value = formatDate(new Date()); // Default to today
    addStudentJoinedDateInput.style.marginBottom = '10px'; // Add some spacing

    // Insert the new input before the add student button
    const addStudentButton = document.querySelector('.student-edit-section button');
    if (addStudentButton) {
        addStudentButton.parentNode.insertBefore(addStudentJoinedDateInput, addStudentButton);
    }
}


let students = [];
let holidays = [];
let classDays = [];
let noClassDays = [];
let attendanceRecords = {}; // { date: { studentId: true/false } }
let dailyNotes = {}; // { date: "notes for the day" }

// Local Storage Keys
const LS_SETTINGS = 'attendanceApp_settings';
const LS_STUDENTS = 'attendanceApp_students';
const LS_HOLIDAYS = 'attendanceApp_holidays';
const LS_CLASS_DAYS = 'attendanceApp_classDays';
const LS_NO_CLASS_DAYS = 'attendanceApp_noClassDays';
const LS_NOTES = 'attendanceApp_notes';
const LS_ATTENDANCE = 'attendanceApp_records';
const LS_DAILY_NOTES = 'attendanceApp_dailyNotes';

// Load data from local storage
function loadData() {
    const settings = localStorage.getItem(LS_SETTINGS);
    if (settings) {
        const parsedSettings = JSON.parse(settings);
        organizationNameInput.value = parsedSettings.organizationName || '';
        classNameInput.value = parsedSettings.className || '';
        classTimingInput.value = parsedSettings.classTiming || '';
    }
    const storedStudents = localStorage.getItem(LS_STUDENTS);
    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }
    const storedHolidays = localStorage.getItem(LS_HOLIDAYS);
    if (storedHolidays) {
        holidays = JSON.parse(storedHolidays);
    }
    const storedClassDays = localStorage.getItem(LS_CLASS_DAYS);
    if (storedClassDays) {
        classDays = JSON.parse(storedClassDays);
    }
    const storedNoClassDays = localStorage.getItem(LS_NO_CLASS_DAYS);
    if (storedNoClassDays) {
        noClassDays = JSON.parse(storedNoClassDays);
    }
    const storedNotes = localStorage.getItem(LS_NOTES);
    if (storedNotes) {
        notesTextarea.value = storedNotes;
    }
    const storedAttendance = localStorage.getItem(LS_ATTENDANCE);
    if (storedAttendance) {
        attendanceRecords = JSON.parse(storedAttendance);
    } else {
        initializeTodayAttendance();
    }
    const storedDailyNotes = localStorage.getItem(LS_DAILY_NOTES);
    if (storedDailyNotes) {
        dailyNotes = JSON.parse(storedDailyNotes);
    }
    updateNotesForToday();
}

function initializeTodayAttendance() {
    const todayFormatted = formatDate(new Date());
    if (!attendanceRecords[todayFormatted]) {
        attendanceRecords[todayFormatted] = {};
        students.forEach(student => {
            // Only default to present if today's date is on or after the joined date
            const joinedDate = new Date(student.joinedDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today's date
            joinedDate.setHours(0, 0, 0, 0); // Normalize joined date
            if (today >= joinedDate) {
                attendanceRecords[todayFormatted][student.id] = true; // Default to present
            }
        });
        saveData();
    }
}

function updateNotesForToday() {
    const todayFormatted = formatDate(new Date());
    notesTextarea.value = dailyNotes[todayFormatted] || '';
}

// Save data to local storage
function saveData() {
    localStorage.setItem(LS_SETTINGS, JSON.stringify({
        organizationName: organizationNameInput.value,
        className: classNameInput.value,
        classTiming: classTimingInput.value
    }));
    localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
    localStorage.setItem(LS_HOLIDAYS, JSON.stringify(holidays));
    localStorage.setItem(LS_CLASS_DAYS, JSON.stringify(classDays));
    localStorage.setItem(LS_NO_CLASS_DAYS, JSON.stringify(noClassDays));
    localStorage.setItem(LS_NOTES, notesTextarea.value);
    localStorage.setItem(LS_ATTENDANCE, JSON.stringify(attendanceRecords));
    localStorage.setItem(LS_DAILY_NOTES, JSON.stringify(dailyNotes));
}

notesTextarea.addEventListener('change', () => {
    const todayFormatted = formatDate(new Date());
    dailyNotes[todayFormatted] = notesTextarea.value;
    saveData();
});

function displayCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', 'month': 'long', day: 'numeric' };
    currentDateDiv.textContent = now.toLocaleDateString('en-US', options);
}

function toggleSettings() {
    settingsSection.style.display = settingsSection.style.display === 'none' ? 'block' : 'none';
}

function toggleStudentEdit() {
    studentEditSection.style.display = studentEditSection.style.display === 'none' ? 'block' : 'none';
    if (studentEditSection.style.display === 'block') {
        renderEditStudents();
    }
}

function togglePastAttendance() {
    pastAttendanceSection.style.display = pastAttendanceSection.style.display === 'none' ? 'block' : 'none';
}

function renderAttendance(date = new Date()) {
    const formattedDate = formatDate(date);
    attendanceListElement.innerHTML = '';
    students.forEach(student => {
        const isNoClassOrHoliday = noClassDays.includes(formattedDate) || holidays.includes(formattedDate);
        const studentJoinedDate = new Date(student.joinedDate);
        const currentAttendanceDate = new Date(date);
        currentAttendanceDate.setHours(0, 0, 0, 0); // Normalize for comparison
        studentJoinedDate.setHours(0, 0, 0, 0); // Normalize for comparison

        const isBeforeJoinedDate = currentAttendanceDate < studentJoinedDate;
        const isPresent = attendanceRecords[formattedDate]?.[student.id] !== false;

        const listItem = document.createElement('li');
        listItem.classList.add('student-item');
        listItem.innerHTML = `
            <span class="student-name">${student.name}</span>
            <div class="attendance-controls">
                ${isNoClassOrHoliday ?
                    '<span style="color: #aaa; font-style: italic;">No Class/Holiday</span>' :
                    (isBeforeJoinedDate ?
                        '<span style="color: #aaa; font-style: italic;">N/A (Joined: ' + student.joinedDate + ')</span>' :
                        `<button class="${isPresent ? 'present' : 'absent'}" onclick="toggleAttendance(${student.id}, '${formattedDate}')">${isPresent ? 'Present' : 'Absent'}</button>`)
                }
            </div>
        `;
        attendanceListElement.appendChild(listItem);
    });
    if (formatDate(new Date()) === formattedDate) {
        saveData(); // Only save if it's today's attendance
    }
}

function toggleAttendance(studentId, date) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const studentJoinedDate = new Date(student.joinedDate);
    const currentAttendanceDate = new Date(date);
    currentAttendanceDate.setHours(0, 0, 0, 0);
    studentJoinedDate.setHours(0, 0, 0, 0);

    if (currentAttendanceDate < studentJoinedDate) {
        alert("Attendance cannot be recorded before the student's joined date (" + student.joinedDate + ").");
        return;
    }

    if (noClassDays.includes(date) || holidays.includes(date)) {
        alert("Attendance cannot be recorded for No-Class days or Holidays.");
        return;
    }
    if (!attendanceRecords[date]) {
        attendanceRecords[date] = {};
    }
    attendanceRecords[date][studentId] = !attendanceRecords[date][studentId];
    if (formatDate(new Date()) === date) {
        renderAttendance(); // Re-render today's attendance
        saveData();
    } else {
        viewPastAttendance(date); // Re-render past attendance if viewing past date
    }
}

function renderEditStudents() {
    editStudentListElement.innerHTML = '';
    students.forEach(student => {
        const listItem = document.createElement('li');
        listItem.classList.add('student-item');
        listItem.innerHTML = `
            <span class="student-name">${student.name} (Joined: ${student.joinedDate})</span>
            <div>
                <button onclick="editStudentName(${student.id})">Edit Name</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </div>
        `;
        editStudentListElement.appendChild(listItem);
    });
}

function addStudent() {
    const newStudentName = addStudentInput.value.trim();
    const newStudentJoinedDate = addStudentJoinedDateInput.value;

    if (newStudentName && newStudentJoinedDate) {
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        students.push({ id: newId, name: newStudentName, joinedDate: newStudentJoinedDate });
        addStudentInput.value = '';
        addStudentJoinedDateInput.value = formatDate(new Date()); // Reset to today
        renderEditStudents();
        renderAttendance();
        saveData();
    } else {
        alert('Please enter student name and joined date.');
    }
}

function editStudentName(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        const newName = prompt(`Enter new name for ${student.name}:`, student.name);
        if (newName !== null && newName.trim() !== '') {
            student.name = newName.trim();
            renderEditStudents();
            renderAttendance(); // Update attendance list display if the name changed
            viewPastAttendance(pastAttendanceDateInput.value); // Update past attendance display
            // No need to call exportAttendanceToExcel here, it's called on explicit button click
            saveData();
        } else if (newName !== null) {
            alert('Student name cannot be empty.');
        }
    }
}

function deleteStudent(studentId) {
    if (!confirm('Are you sure you want to delete this student and all their attendance records?')) {
        return;
    }
    students = students.filter(student => student.id !== studentId);
    // Remove attendance records for the deleted student
    for (const date in attendanceRecords) {
        delete attendanceRecords[date][studentId];
    }
    renderEditStudents();
    renderAttendance();
    saveData();
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendarTable = document.createElement('table');
    calendarTable.classList.add('calendar');

    const monthNames =
        ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    const monthHeader = calendarTable.createTHead();
    const monthRow = monthHeader.insertRow();
    const monthCell = monthRow.insertCell();
    monthCell.colSpan = 7;
    monthCell.textContent = `${monthNames[month]} ${year}`;

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysRow = calendarTable.insertRow();
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        daysRow.appendChild(th);
    });

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const weekRow = calendarTable.insertRow();
        for (let j = 0; j < 7; j++) {
            const dayCell = weekRow.insertCell();
            if (i === 0 && j < startingDay) {
                // Empty cells before the first day
            } else if (date > daysInMonth) {
                // Empty cells after the last day
            } else {
                const currentDate = formatDate(new Date(year, month, date));
                dayCell.textContent = date;
                dayCell.addEventListener('click', () => toggleCalendarDayType(currentDate));
                if (holidays.includes(currentDate)) {
                    dayCell.classList.add('holiday');
                    dayCell.title = 'Holiday';
                } else if (classDays.includes(currentDate)) {
                    dayCell.classList.add('class-day');
                    dayCell.title = 'Class Day';
                } else if (noClassDays.includes(currentDate)) {
                    dayCell.classList.add('no-class');
                    dayCell.title = 'No Class';
                }
                date++;
            }
        }
        if (date > daysInMonth) break;
    }

    calendarDiv.innerHTML = '';
    calendarDiv.appendChild(calendarTable);
}

function toggleCalendarDayType(date) {
    if (holidays.includes(date)) {
        holidays = holidays.filter(d => d !== date);
        classDays.push(date);
    } else if (classDays.includes(date)) {
        classDays = classDays.filter(d => d !== date);
        noClassDays.push(date);
    } else if (noClassDays.includes(date)) {
        noClassDays = noClassDays.filter(d => d !== date);
        // It becomes a regular day, no specific class
    } else {
        holidays.push(date);
    }
    saveData();
    generateCalendar();
}

function viewPastAttendance(selectedDate) {
    const dateToView = selectedDate || pastAttendanceDateInput.value;
    if (!dateToView) {
        alert('Please select a date to view past attendance.');
        return;
    }

    pastAttendanceListElement.innerHTML = '';
    const attendanceForDate = attendanceRecords[dateToView] || {};
    const isNoClassOrHoliday = noClassDays.includes(dateToView) || holidays.includes(dateToView);

    students.forEach(student => {
        const studentJoinedDate = new Date(student.joinedDate);
        const currentAttendanceDate = new Date(dateToView);
        currentAttendanceDate.setHours(0, 0, 0, 0); // Normalize for comparison
        studentJoinedDate.setHours(0, 0, 0, 0); // Normalize for comparison

        const isBeforeJoinedDate = currentAttendanceDate < studentJoinedDate;
        const isPresent = attendanceForDate[student.id] !== false;

        const listItem = document.createElement('li');
        listItem.classList.add('past-attendance-item');
        listItem.innerHTML = `
            <span class="student-name">${student.name}</span>
            <div class="attendance-controls">
                ${isNoClassOrHoliday ?
                    '<span style="color: #aaa; font-style: italic;">No Class/Holiday</span>' :
                    (isBeforeJoinedDate ?
                        '<span style="color: #aaa; font-style: italic;">N/A (Joined: ' + student.joinedDate + ')</span>' :
                        `<button class="${isPresent ? 'present' : 'absent'}" onclick="toggleAttendance(${student.id}, '${dateToView}')">${isPresent ? 'Present' : 'Absent'}</button>`)
                }
            </div>
        `;
        pastAttendanceListElement.appendChild(listItem);
    });
}

function exportAttendanceToExcel() {
    const startDateInput = document.getElementById('export-start-date');
    const endDateInput = document.getElementById('export-end-date');
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        alert('Please select a start and end date for export.');
        return;
    }

    const allDatesInRange = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    while (currentDate <= end) {
        allDatesInRange.push(formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Filter class days that are actually class days in the selected range
    const relevantClassDays = allDatesInRange.filter(date => classDays.includes(date));

    if (relevantClassDays.length === 0) {
        alert('No class days found within the selected date range for export.');
        return;
    }

    const orgName = organizationNameInput.value;
    const className = classNameInput.value;
    const classTiming = classTimingInput.value;

    let csvContent = "";
    if (orgName) csvContent += `Organization Name:,${orgName}\n`;
    if (className) csvContent += `Class:,${className}\n`;
    if (classTiming) csvContent += `Timing:,${classTiming}\n`;
    csvContent += "\n";

    // Horizontal header for daily attendance
    const header = ["Date", "Notes", ...students.map(s => s.name)];
    csvContent += header.join(",") + "\n";

    relevantClassDays.forEach(date => {
        const attendanceForDate = attendanceRecords[date] || {};
        const notesForDate = dailyNotes[date] || '';
        const rowData = [date, notesForDate];

        students.forEach(student => {
            const studentJoinedDate = new Date(student.joinedDate);
            const currentAttendanceDate = new Date(date);
            currentAttendanceDate.setHours(0, 0, 0, 0);
            studentJoinedDate.setHours(0, 0, 0, 0);

            if (currentAttendanceDate < studentJoinedDate) {
                rowData.push('N/A (Before Joined Date)');
            } else {
                const isPresent = attendanceForDate[student.id] !== false;
                rowData.push(isPresent ? 'Present' : 'Absent');
            }
        });
        csvContent += rowData.join(",") + "\n";
    });

    // Vertical Summary Row per Student
    csvContent += "\nStudent Summary\n";
    const summaryHeader = ["Student Name", "Joined Date", "Total Working Days Eligible", "Total Present", "Total Absent"];
    csvContent += summaryHeader.join(",") + "\n";

    students.forEach(student => {
        let totalWorkingDaysEligible = 0;
        let totalPresent = 0;
        let totalAbsent = 0;

        const studentJoinedDate = new Date(student.joinedDate);
        studentJoinedDate.setHours(0, 0, 0, 0);

        relevantClassDays.forEach(dateString => {
            const classDate = new Date(dateString);
            classDate.setHours(0, 0, 0, 0);

            // Only count if the class day is on or after the student's joined date
            if (classDate >= studentJoinedDate) {
                totalWorkingDaysEligible++; // This is a day the student was eligible to attend
                const attendanceForDate = attendanceRecords[dateString];

                // If attendance record exists for this student on this date
                if (attendanceForDate && attendanceForDate.hasOwnProperty(student.id)) {
                    if (attendanceForDate[student.id] !== false) {
                        totalPresent++;
                    } else {
                        totalAbsent++;
                    }
                } else {
                    // If no explicit record, consider them present by default (based on initializeTodayAttendance)
                    // Or, if you want to count as absent by default for past dates, change this logic.
                    // For now, sticking to existing logic of default 'true' if no record.
                    totalPresent++;
                }
            }
        });
        csvContent += [student.name, student.joinedDate, totalWorkingDaysEligible, totalPresent, totalAbsent].join(",") + "\n";
    });


    const filename = `attendance_${startDate}_to_${endDate}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) { // IE and Edge
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

// Initial setup
loadData();
displayCurrentDate();
renderAttendance();
generateCalendar();
settingsSection.style.display = 'none'; // Initially hide settings