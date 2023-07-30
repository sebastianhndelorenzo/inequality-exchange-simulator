<<<<<<< HEAD
// Get the play/pause button 
const playPauseBtn = document.getElementById('playPauseBtn');

let enginePaused = true;

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
=======
// Get the play/pause button 
const playPauseBtn = document.getElementById('playPauseBtn');

let enginePaused = true;

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
>>>>>>> 1d3e3665e7ae60d6168cb7a472d981aabbd183eb
