// Iterate over each slider and attach an input event
document.querySelectorAll(".slider").forEach((slider) => {
    slider.addEventListener('input', function() {
        const valueDisplay = this.parentElement.querySelector('.slider-value');
        valueDisplay.textContent = this.value;
    });
});

// Startup
agarioTicked(); // Necessary to initialize agario node properties

// Create a reference to the popper.js library
const { createPopper } = window.Popper;

let popperInstance = null;

function showPopup(referenceElem) {
    const popup = document.getElementById("ui-popup");
    popup.style.display = "block";

    popperInstance = createPopper(referenceElem, popup, {
        placement: 'right',  // adjust as needed
        modifiers: [{name: 'offset',options: {offset: [0, 10]}}]});
    popup.style.left = referenceElem.x;
    popup.style.right = referenceElem.x;
}

function hidePopup() {
    const popup = document.getElementById("ui-popup");
    if (popperInstance) {
        currentNode = null;
        popperInstance.destroy();
        popperInstance = null;
    }
    popup.style.display = "none";
}


d3.selectAll(".agarioNode, .node").on("contextmenu", function(event, d) {
    if (!popperInstance || currentNode !== d) { // Create a new popup if there are none or we're clicking on a new node
        event.preventDefault();
        currentNode = d;
        const nodeInfo = `Name: ${d.agent.name}<br>
                        Savings: £${Math.round(d.agent.wealth)}<br>
                        Village: ${groupDetails[d.group].name}`;
        document.querySelector("#node-info").innerHTML = nodeInfo;
        showPopup(this);
    } 
    else {
        hidePopup();
    }
});

document.querySelector('#closeButton').addEventListener('click', function() {
    hidePopup();
});

function updatePopup(){
    if (popperInstance) {
        let d = currentNode;
        const nodeInfo = `Name: ${d.agent.name}<br>
                        Savings: £${Math.round(d.agent.wealth)}<br>
                        Village: ${groupDetails[d.group].name}`;
        document.querySelector("#node-info").innerHTML = nodeInfo;
    }
}

function updateGiniDisplay() {
    document.getElementById('gini-display').textContent = giniCoefficient().toFixed(3);
}

let sortedWealths = []
function updateParetoDisplay(total_wealth) {
    sortedWealths = agents.map(agent => agent.wealth).sort((a, b) => b - a);
    let top20PercentCount = Math.floor(0.2 * sortedWealths.length);

    let top20PercentWealth = 0;
    for (let i = 0; i < top20PercentCount; i++) {
        top20PercentWealth += sortedWealths[i];
    }

    let ratio = top20PercentWealth / total_wealth;

    document.getElementById('pareto-display').textContent = (ratio * 100).toFixed(1);
}

function updateControlPanel(total_wealth, reserves) {
    updatePopup();
    updateGiniDisplay();
    updateParetoDisplay(total_wealth);
    updateReserveDisplay(reserves);
}

function updateReserveDisplay(reserves) {
    document.getElementById('reserves-display').textContent = '£' + reserves.toFixed(0);
}

// When nothing is right clicked
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Control relationship settings
document.getElementById('connectionSetup').addEventListener('change', function() {
    if (this.value === 'random') {
        randomConnect();
    } else if (this.value === 'village') {
        villageConnect();
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    totalGlobalReset();
})

////////////////////////////////////
document.getElementById('gini-question').addEventListener('click', function() {
    Swal.fire({
        showConfirmButton: false,
        width: '400px',
        html: `
            <a href="https://en.wikipedia.org/wiki/Gini_coefficient" target="_blank">Gini Coefficient</a>
            <p>A measure of how financially unequal a society is. A value of 1 represents high inequality, while 0 represents total equality.</p>
        `
    });
});

document.getElementById('pareto-question').addEventListener('click', function() {
    Swal.fire({
        showConfirmButton: false,
        width: '400px',
        html: `
            In many socities, wealth distribution is governed by the 
            <a href="https://en.wikipedia.org/wiki/Pareto_principle" target="_blank">Pareto principle</a>, also known as the "80-20 rule".`
    });
});

document.getElementById('reserves-question').addEventListener('click', function() {
    Swal.fire({
        showConfirmButton: false,
        width: '400px',
        html: `
            The amount of money avaliable for redistribution, infrastructure, and job training schemes.`
    });
});

document.getElementById('creditsButton').addEventListener('click', function() {
    Swal.fire({
        showConfirmButton: false,
        title: 'Credits',
        width: '620px',
        html: `<strong>HTML, CSS, Javascript:</strong> Sebastian DeLorenzo
        <br><strong>Actor Network:</strong> The Stanford GraphBase by Professor Donald Knuth 
        <a href="https://www-cs-faculty.stanford.edu/~knuth/sgb.html">https://www-cs-faculty.stanford.edu/~knuth/sgb.html</a> 
        <a href="http://ftp.cs.stanford.edu/pub/sgb/jean.dat">http://ftp.cs.stanford.edu/pub/sgb/jean.dat</a> <br>
        <strong>Newspaper Design:</strong> Inspired by <em>The Stanford Daily</em> <br> <a href="https://stanforddaily.com/">https://stanforddaily.com/</a>
        <br><strong>Old English Font:</strong> <a href="https://www.onlinewebfonts.com/download/f3258385782c4c96aa24fe8b5d5f9782">https://www.onlinewebfonts.com</a>`
    });
});

////////////////////////////////////

document.getElementById('incomeToggleAdvanced').addEventListener('click', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const advancedSliders = document.getElementById('advancedIncomeSliders');
    const incomeContainer = document.getElementById('income-container');
    const hiddenText = document.getElementById('hidden-text-1');

    if (advancedSliders.style.display === 'none' || !advancedSliders.style.display) {
        advancedSliders.style.display = 'block';
        sliderContainer.classList.add('expanded');
        incomeContainer.style.height = '133px'; 
        hiddenText.style.display = 'block';
    } else {
        advancedSliders.style.display = 'none';
        sliderContainer.classList.remove('expanded');
        incomeContainer.style.height = '91px'; 
        hiddenText.style.display = 'none';
    }
});

document.getElementById('wealthToggleAdvanced').addEventListener('click', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const advancedSliders = document.getElementById('advancedWealthSliders');
    const incomeContainer = document.getElementById('wealthtax-container');
    const hiddenText = document.getElementById('hidden-text-2');

    if (advancedSliders.style.display === 'none' || !advancedSliders.style.display) {
        advancedSliders.style.display = 'block';
        sliderContainer.classList.add('expanded');
        incomeContainer.style.height = '133px'; 
        hiddenText.style.display = 'block';
    } else {
        advancedSliders.style.display = 'none';
        sliderContainer.classList.remove('expanded');
        incomeContainer.style.height = '91px'; 
        hiddenText.style.display = 'none';
    }
});

