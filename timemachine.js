// Get the play/pause button 
const playPauseBtn = document.getElementById('playPauseBtn');

let enginePaused = true;

let timeSpeed = 1; // constant affecting time speed which we control using UI
let gameLoopInterval = setInterval(gameLoop, 400)

// Add a click event listener
playPauseBtn.addEventListener('click', function() {
    // Check if the current symbol is the play symbol
    if (playPauseBtn.textContent.trim() === '▶️') {
        playPauseBtn.textContent = '⏸️';
        enginePaused = false;
    } else {
        playPauseBtn.textContent = '▶️';
        enginePaused = true;
    }
});

const timeSpeedToInterval = { // maps timeSpeed to the time in ms between loop executes
    1 : 200, 
    2 : 25, 
    3 : 0
}

fastBackwardBtn.addEventListener('click', function() {
    if (timeSpeed > 1) {
        timeSpeed -= 1;
    }

    clearInterval(gameLoopInterval)
    gameLoopInterval = setInterval(gameLoop, timeSpeedToInterval[timeSpeed])
});

fastForwardBtn.addEventListener('click', function() {
    if (timeSpeed < 3) {
        timeSpeed += 1;
    }

    clearInterval(gameLoopInterval)
    gameLoopInterval = setInterval(gameLoop, timeSpeedToInterval[timeSpeed])
});

function formatDate(inputDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function setDateDisplay(date) {
    const dateElem = document.getElementById('dateDisplay');
    dateElem.textContent = formatDate(date);
}
