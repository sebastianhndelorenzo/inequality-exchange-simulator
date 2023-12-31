let nodes = [];
let links = [];

// Window dimensions
const width = 400;
const height = 360;
// Sync css with js
document.getElementById('graphContainer').style.width = width + 'px';
document.getElementById('graphContainer').style.height = height + 'px';

// Specify the color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

let nodeRadius = 4; // radius of NETWORK nodes

// Maps each group id to the details of their village
const groupDetails = {
    8: { name: "Dwarfdale Dunes", color: "#17becf"},
    0: { name: "Teaspoon Terrace", color: "#9467bd"},
    1: { name: "Mini Meadows", color: "#ff7f0e"},
    2: { name: "Pintsized Plains", color: "#2ca02c"},
    3: { name: "Lil' Lagoon Landing", color: "#d62728"},
    4: { name: "Bitty Borough", color: "#e377c2"},
    5: { name: "Ittyville Isles", color: "#8c564b"},
    7: { name: "Nano Nook", color: "#bcbd22"},

};

function addNode() {
    // Generate a random position within the SVG's width and height
    const randomX = Math.random() * (width - 2*nodeRadius);
    const randomY = Math.random() * (height - 2*nodeRadius);

    // Create a new node with the random position
    const newNode = { x: randomX, y: randomY };
    nodes.push(newNode);

    // Update the nodes' data binding
    svg.select(".nodes").selectAll("circle").data(nodes).join("circle").attr("class", "node")
        .attr("r", nodeRadius).attr("cx", d => d.x).attr("cy", d => d.y)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    return newNode;
}


const svg = d3.select("#network")
    .attr("width", width)
    .attr("height", height);

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(10).strength(100))
    .force("charge", d3.forceManyBody().strength(-40))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Draw links
let link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "link");

// Draw nodes
let node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("class", "node")
    .attr("r", nodeRadius)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}

let currentNode;
simulation.on("tick", () => {
    node.attr("cx", d => {
        d.x = Math.max(nodeRadius +(1.5), Math.min(width - 2*nodeRadius + (1), d.x)); // prevent nodes going outside window bounds - brackets indicate buffer
        return d.x;
    })
    .attr("cy", d => {
        d.y = Math.max(nodeRadius +(1.5), Math.min(height - 2*nodeRadius +(1), d.y)); // prevent nodes going outside window bounds
        return d.y;
    });

    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    if (currentNode) {
        popperInstance.update();
    }
});

function updateGraph() {
    // Update the link elements
    link = svg.select(".links")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("class", "link");

    // Update the node elements
    node = svg.select(".nodes")
        .selectAll("circle")
        .data(nodes, d => d.id)
        .join("circle")
        .attr("class", "node")
        .attr("r", nodeRadius)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

    // Restart the simulation
    simulation
    .nodes(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(10))
    .force("charge", d3.forceManyBody().strength(-26))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .alpha(1)
    .alphaDecay(0.002)
    .restart();

    // Recolor the nodes
    svg.selectAll(".node") //.append("title").text(d => d.group);
       .append("title").text(d => `Index: ${nodes.indexOf(d)}\nId: ${d.id}\nWealth: ${d.agent.wealth}`);
}

const legend = d3.select("#legend")
    .append("svg")
    .attr("width", 170)  // Adjust these dimensions as needed
    .attr("height", 195)
    .append("g")
    .selectAll("g")
    .data(Object.entries(groupDetails))
    .enter().append("g")
    .attr("transform", (d, i) => `translate(0,${i * 25})`);

legend.append("circle")
    .attr("cx", 9)
    .attr("cy", 9)
    .attr("r", 5)
    .style("fill", d => d[1].color);

legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(d => d[1].name);


const keyButton = document.getElementById("keyButton");
const legendDiv = document.getElementById("legend");

keyButton.addEventListener("click", function() {
    if (window.getComputedStyle(legendDiv).display === "none") {
        legendDiv.style.display = "block";
        keyButton.textContent = "Hide Key";
    } else {
        legendDiv.style.display = "none";
        keyButton.textContent = "Key";
    }
});
