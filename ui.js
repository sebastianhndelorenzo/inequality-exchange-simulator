// Iterate over each slider and attach an input event
document.querySelectorAll(".slider").forEach((slider) => {
    slider.addEventListener('input', function() {
        const valueDisplay = this.parentElement.querySelector('.slider-value');
        valueDisplay.textContent = this.value;
    });
});
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