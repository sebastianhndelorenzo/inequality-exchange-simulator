// initialWealths - used to set actor wealths according to the Pareto distribution
// originalWealths - used by the reset button to reset wealths

class Agent{
    constructor(){
        this.node = addNode()
        agents.push(this)
        this.neighbors = [];
        this.node.agent = this;

        this.wealth = 100;
        this.name = this.getRandomName();
    }

    getRandomName() {
        const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
        const randomLastName = lastnames[Math.floor(Math.random() * lastnames.length)];
        return `${randomFirstName} ${randomLastName}`;
    }
}

let agents = []

// Create the agents - keep number at 77
for(let i=0; i < 77; i++){
    new Agent;
}

/*----PARETO DISTRUBTION----*/
function generateParetoValues(alpha, xm, n) {
    const values = [];
    for (let i = 1; i <= n; i++) {
        // Calculate the percentile for this index
        const p = i / (n + 1);
        
        // Apply the inverse CDF
        const x = xm / Math.pow(1 - p, 1/alpha);
        
        values.push(x);
    }
    return values;
}
let initialWealths = generateParetoValues(0.78, 10, agents.length);
function setWealthToPareto() {
    const shuffledWealths = shuffleArray([...initialWealths]); // Shallow copy and shuffle
    agents.forEach((agent, index) => {
        agent.wealth = shuffledWealths[index];
    });
}

function totalGlobalWealth() { return agents.reduce((total, agent) => total + agent.wealth, 0);}

// Connects two nodes
function addLink(node1, node2) {
    // Create a new link object
    const newLink = {
        source: node1,
        target: node2
    };
    // Add the link to the links dataset
    links.push(newLink);

    // Add each node to the other's neighbor array
    node1.agent.neighbors.push(node2.agent);
    node2.agent.neighbors.push(node1.agent);

    simulation.nodes(nodes).alpha(1).restart();
    updateGraph();
}

function randomConnect(){
    links = [];
    // Clear neighbors
    for(let i = 0; i < agents.length; i++) {
        agents[i].neighbors = [];
    }

    let m = 4; // Average degree
    for(let i = 0; i < agents.length; i++) {
        let agent = agents[i];
        let availableAgents = agents.filter(a => a !== agent && !agent.neighbors.includes(a));
        
        while(agent.neighbors.length < m && availableAgents.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableAgents.length);
            let randomAgent = availableAgents[randomIndex];

            if(randomAgent.neighbors.length < m) {
                addLink(agent.node, randomAgent.node);
            }
            // Remove the chosen agent from available agents for next iteration.
            availableAgents.splice(randomIndex, 1);
        }
    }
    updateGraph();
    svg.selectAll(".node").style("fill", d => groupDetails[d.group].color);
}

function convertLinkToNodes(link, nodesArray) {
    // Input: link Output: Array = [source node, target node]
    let returnArray = [];
    returnArray.push(nodesArray.find(node => node.id === link.source));
    returnArray.push(nodesArray.find(node => node.id === link.target));

    return returnArray;
    //return nodesArray.find(node => node.id === link.source);
}

function villageConnect(){
    links = [];
    for(let i = 0; i < agents.length; i++) {
        agents[i].neighbors = [];
        agents[i].node = villageNodes[i];
        villageNodes[i].agent = agents[i];
    }
    nodes = villageNodes;
    // Connect the nodes
    for (let i = 0; i < villageLinks.length; i++) {
        addLink(convertLinkToNodes(villageLinks[i], villageNodes)[0], convertLinkToNodes(villageLinks[i], villageNodes)[1]);
    }

    updateGraph();
    svg.selectAll(".node").style("fill", d => groupDetails[d.group].color);
}
////////////////////////////////////////////////

// One-time checks on startup
if (document.getElementById('connectionSetup').value === 'random'){
    randomConnect();
} else if (document.getElementById('connectionSetup').value === 'village'){
    villageConnect();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

setWealthToPareto();
currentDate = new Date(2000, 0, 1);
setDateDisplay(currentDate);

let originalWealths = agents.map(agent => agent.wealth);
console.log(originalWealths)
console.log(agents[0].name)
console.log(groupDetails[agents[0].node.group].color)

//////////////////////////////////////////////
let element = document.getElementById("reserves-display");
let textContent = element.textContent || element.innerText; // innerText for older browsers
let numericalValue = parseFloat(textContent.replace("£", "").trim());
let reserves = numericalValue;



