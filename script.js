function startCountdown() {
  const dateInput = document.getElementById('date').value;
  const timeInput = document.getElementById('time').value;

  if (!dateInput || !timeInput) {
    displayMessage('Please select both date and time.');
    return;
  }

  const targetDateTimeString = dateInput + 'T' + timeInput;
  const targetDate = new Date(targetDateTimeString);

  if (isNaN(targetDate.getTime())) {
    displayMessage('Invalid date or time format.');
    return;
  }

  if (targetDate <= new Date()) {
    displayMessage('Selected time has already passed.');
    return;
  }

  function updateTimer() {
    const timeRemaining = targetDate - new Date();
    const [days, hours, minutes, seconds] = [
      Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
      Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
      Math.floor((timeRemaining % (1000 * 60)) / 1000),
    ];
    let displayString = '';

    if (days > 0) {
      displayString += `${days}Day `;
    }
  
    if (hours > 0) {
      displayString += `${hours}Hour `;
    }
  
    if (minutes > 0) {
      displayString += `${minutes}Minute `;
    }
  
    if (seconds > 0 || displayString === '') {
      displayString += `${seconds}Second`;
    }
  
    document.getElementById('timer').innerHTML = displayString;
  
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      displayMessage('Time Expired!');
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

function displayMessage(message) {
  document.getElementById('timer').innerHTML = message;
}
