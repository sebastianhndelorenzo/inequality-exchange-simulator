let gameTick = 0;

function gameLoop() {
    if (enginePaused) {
        return;
    }
    
    gameTick++;
    currentDate.setDate(currentDate.getDate() + 1);
    setDateDisplay(currentDate);

    let total_wealth = totalGlobalWealth();
    
    updateControlPanel(total_wealth, reserves);
    increaseSavingsByInterest();
    exchangeMoney();
    updateAgarioSizes(total_wealth);
}