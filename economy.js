let exchangeRate = 0.01224 * 0.18 // high exchange => low inequality. This is the MEAN exchange rate. 

function increaseSavingsByInterest() {
    let averageInterestRate = parseFloat(document.getElementById("interestRateSlider").value) * 0.01; // yearly interest rate
    let averageDailyInterestRate = Math.pow(1 + averageInterestRate, 1/365) - 1;
    agents.forEach(d => {
        d.wealth += d.wealth * averageDailyInterestRate;
    });
}

// Init exchange matrix
let J = nj.zeros([agents.length, agents.length]);

let exchangeExponent = 0.55;
links.forEach(link => {
    let agent1 = link.source.agent;
    let agent2 = link.target.agent;

    J.set(agents.indexOf(agent1), agents.indexOf(agent2), exchangeRate * (agent1.wealth / agent2.wealth)**exchangeExponent);
    J.set(agents.indexOf(agent2), agents.indexOf(agent1), exchangeRate * (agent2.wealth / agent1.wealth)**exchangeExponent);
})

// Profit/loss calculation
Agent.prototype.JProfit = function() {
    let total_profit = 0;
    this.neighbors.forEach(neighbor => {
        total_profit += J.get(agents.indexOf(this), agents.indexOf(neighbor)) * neighbor.wealth;
    })
    return total_profit;
}

Agent.prototype.JLoss = function () {
    let total_loss = 0;
    this.neighbors.forEach(neighbor => {
        total_loss += J.get(agents.indexOf(neighbor), agents.indexOf(this));
    })
    total_loss *= this.wealth;
    return total_loss;
}

function exchangeMoney() {
    // Income tax variables
    let annualIncomeTax = parseFloat(document.getElementById('incomeTaxSlider').value) * 0.01
    let dailyIncomeTax = 1 - Math.pow(1-annualIncomeTax, 1/365);

    let percentPayingIncomeTax = parseFloat(document.getElementById('percentPayingIncomeTax').value) * 0.01;
    let incomeTaxThreshholdWealth = sortedWealths[Math.floor(sortedWealths.length * percentPayingIncomeTax) - 1];
    if (Math.floor(sortedWealths.length * percentPayingIncomeTax) -1 == -1) {
        incomeTaxThreshholdWealth = 2 * sortedWealths[0]; // means no one will pay income tax
    }
    
    // Wealth tax variables
    let annualWealthTax = parseFloat(document.getElementById('wealthTaxSlider').value) * 0.01
    let dailyWealthTax = 1 - Math.pow(1-annualWealthTax, 1/365);

    let percentPayingWealthTax = parseFloat(document.getElementById('percentPayingWealthTax').value) * 0.01;
    let wealthTaxThreshholdWealth = sortedWealths[Math.floor(sortedWealths.length * percentPayingWealthTax) - 1];
    if (Math.floor(sortedWealths.length * percentPayingWealthTax) -1 == -1) {
        wealthTaxThreshholdWealth = 2 * sortedWealths[0]; // means no one will pay wealth tax
    }

    agents.forEach(agent => {
        if (agent.wealth >= incomeTaxThreshholdWealth) {
            agent.nextTickIncome = agent.JProfit() * (1 - dailyIncomeTax);
            reserves += agent.JProfit() * dailyIncomeTax;
        }
        else {
            agent.nextTickIncome = agent.JProfit();
        }
        agent.nextTickIncome -= agent.JLoss();

        if (agent.wealth >= wealthTaxThreshholdWealth) {
            reserves += agent.wealth * dailyWealthTax;
            agent.wealth *= (1 - dailyWealthTax)
        }
    })
    agents.forEach(agent => {
        agent.wealth += agent.nextTickIncome;
    })
}

function giniCoefficient() {
    let wealths = agents.map(agent => agent.wealth);
    let n = wealths.length;

    // Calculate sum of absolute differences
    let sumOfAbsoluteDifferences = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sumOfAbsoluteDifferences += Math.abs(wealths[i] - wealths[j]);
        }
    }

    // Calculate mean wealth
    let meanWealth = wealths.reduce((acc, wealth) => acc + wealth, 0) / n;

    // Return Gini coefficient
    return sumOfAbsoluteDifferences / (2 * n * n * meanWealth);
}

let total_wealth = totalGlobalWealth();
updateGiniDisplay();

function totalGlobalReset() {
    if (enginePaused == false) {
        document.getElementById('playPauseBtn').click();
    }
    setDateDisplay(startDate)
    gameTick = 0;

    // Reset each agent's wealth to its original value
    agents.forEach((agent, index) => {
        agent.wealth = originalWealths[index];
    });
}