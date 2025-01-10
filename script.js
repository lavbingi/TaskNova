document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskDateInput = document.getElementById('task-date');
  const taskTitleInput = document.getElementById('task-title');
  const taskCategoryInput = document.getElementById('task-category');
  const taskColorInput = document.getElementById('task-color');
  const taskDeadlineInput = document.getElementById('task-deadline');
  const taskList = document.getElementById('task-list');
  const calendarDays = document.getElementById('days');
  const monthYearElement = document.getElementById('month-year');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');

  const timetableForm = document.getElementById('timetable-form');
  const timetableDayInput = document.getElementById('timetable-day');
  const entryTimeInput = document.getElementById('entry-time');
  const entryActivityInput = document.getElementById('entry-activity');
  const entryColorInput = document.getElementById('entry-color');
  const timetableTable = document.getElementById('traditional-timetable');

  let tasks = [];
  let timetableEntries = [];
  let currentDate = new Date(); // Initialize to the current date

  // Function to render tasks
  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${task.title}</strong> 
        <span>${task.category}</span>
        <span>Deadline: ${task.deadline}</span>
        <button onclick="removeTask(${index})">Delete</button>
      `;
      taskList.appendChild(li);
    });
  };

  // Function to render calendar with task colors
  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    calendarDays.innerHTML = ''; // Clear previous days
    const firstDay = new Date(year, month, 1).getDay();

    // Render empty divs for the first week days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement('div');
      calendarDays.appendChild(emptyDiv);
    }

    // Render the days with task colors
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
      
      // Check if there are any tasks for this date
      const taskForTheDay = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year;
      });

      if (taskForTheDay.length > 0) {
        dayDiv.style.backgroundColor = taskForTheDay[0].color;
      }

      calendarDays.appendChild(dayDiv);
    }

    // Update the month and year label
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[month];
    monthYearElement.textContent = `${monthName} ${year}`;
  };

  // Handle task form submission
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
      date: taskDateInput.value,
      title: taskTitleInput.value,
      category: taskCategoryInput.value,
      color: taskColorInput.value,
      deadline: taskDeadlineInput.value
    };
    tasks.push(task);
    renderTasks();
    renderCalendar(); // Re-render the calendar to show the new task

    // Reset the form
    taskForm.reset();
  });

  // Remove task by index
  window.removeTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
    renderCalendar(); // Re-render the calendar after removing a task
  };

  // Handle previous month button click
  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  // Handle next month button click
  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Render timetable entries
  const renderTimetable = () => {
    timetableTable.querySelectorAll('td').forEach(cell => cell.innerHTML = ''); // Clear existing timetable

    timetableEntries.forEach(entry => {
      const dayCell = document.getElementById(entry.day.toLowerCase()); // Get the correct day cell by id
      if (dayCell) {
        dayCell.innerHTML += `
          <div style="background-color: ${entry.color}; padding: 5px; margin: 5px; border-radius: 5px;">
            <strong>${entry.time}</strong> - ${entry.activity}
          </div>
        `;
      }
    });
  };

  // Handle timetable form submission
  timetableForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const timetableEntry = {
      day: timetableDayInput.value,
      time: entryTimeInput.value,
      activity: entryActivityInput.value,
      color: entryColorInput.value
    };
    timetableEntries.push(timetableEntry);
    renderTimetable(); // Re-render timetable after adding an entry
    timetableForm.reset();
  });

  // Initialize the calendar with current month
  renderCalendar();
});
// Handle sign up form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Store credentials in localStorage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  alert('Sign up successful! You can now log in.');

  // Redirect to login page
  window.location.href = 'login.html';
});
// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Retrieve stored credentials from localStorage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Validate credentials
  if (username === storedUsername && password === storedPassword) {
    alert('Login successful!');
    window.location.href = 'pages/TaskNova.html'; // Redirect to Tasknova main page
  } else {
    alert('Incorrect username or password!');
  }
  

});
