const agarioNodes = nodes.map(node => ({ ...node }));  // This creates a deep copy of the nodes

agarioNodes.forEach(d => {d.cluster = d.group, d.r= 2*Math.sqrt(d.agent.wealth)})

const clusters = {};

const agarioSvgWidth = width;
const agarioSvgHeight = height;

agarioNodes.forEach(d => {
    if (!clusters[d.group]) {
        clusters[d.group] = d;
    }
});

// Define a clusters object to store central points for each group
const clusterCenters = {};

const numberOfClusters = Object.keys(clusters).length;
const centerX = agarioSvgWidth / 2;
const centerY = agarioSvgHeight / 2;
const distributionRadius = Math.min(agarioSvgWidth, agarioSvgHeight) * 0.4; // Determines how far each cluster center is from the true center
const angleIncrement = 2 * Math.PI / numberOfClusters;

Object.keys(clusters).forEach((group, index) => {
    const angle = index * angleIncrement;
    clusterCenters[group] = {
        x: centerX + distributionRadius * Math.cos(angle),
        y: centerY + distributionRadius * Math.sin(angle)
    };
});

// Define a radius around which nodes will spawn relative to the cluster's central point
const clusterRadius = 50;

// Set node positions based on their group's cluster center
agarioNodes.forEach(node => {
    const center = clusterCenters[node.group];
    // Generate a random angle and distance to add some randomness around the cluster center
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * clusterRadius;

    node.x = center.x + distance * Math.cos(angle);
    node.y = center.y + distance * Math.sin(angle);
    node.cx = node.x;
    node.cy = node.y;
});

const agarioSvg = d3.select("#agario")
    .attr("width", agarioSvgWidth)
    .attr("height", agarioSvgHeight);

function customCollision() {
    const alpha = 0.4; // fixed for greater rigidity
    const padding1 = 2; // separation between same-group node circumferences
    const padding2 = 6; // separation between different-group node circumferences
    let nodes;

    function force() {
        for (let i = 0; i < nodes.length; ++i) {
            for (let j = i + 1; j < nodes.length; ++j) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                const dx = node1.x - node2.x;
                const dy = node1.y - node2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minSeparation = (node1.group === node2.group) 
                    ? node1.r + node2.r + padding1
                    : node1.r + node2.r + padding2;

                if (distance < minSeparation) {
                    const overlap = minSeparation - distance;
                    const lx = (overlap / distance) * dx;
                    const ly = (overlap / distance) * dy;

                    node1.x += lx / 2; // share the adjustment between the two nodes
                    node1.y += ly / 2;
                    node2.x -= lx / 2;
                    node2.y -= ly / 2;
                }
            }
        }
    }

    force.initialize = function(_) {
        nodes = _;
    }

    return force;
}



const centeringForce = d3.forceCenter(agarioSvgWidth / 2, agarioSvgHeight / 2);
const agarioSimulation = d3.forceSimulation(agarioNodes)
    .alphaDecay(0.01)
    .force("x", d3.forceX(width / 2).strength(0.03))
    .force("y", d3.forceY(height / 2).strength(0.03))
    //.force("charge", d3.forceManyBody().strength(2)) 
    .force("collision", customCollision()) //d3.forceCollide(6).strength(1)
    .force("cluster", forceCluster())
    .on("tick", agarioTicked);

function forceCluster() {
  const strength = 0.05;
  let nodes;

  function force(alpha) {
    const centroids = d3.rollup(nodes, centroid, d => d.group);
    const l = alpha * strength;
    for (const d of nodes) {
      const {x: cx, y: cy} = centroids.get(d.group);
        d.vx -= (d.x - cx) * l; 
        d.vy -= (d.y - cy) * l;
    }
  }

  force.initialize = _ => nodes = _;

  return force;
}

function centroid(nodes) {
    let x = 0; let y = 0; let z = 0;
    for (const d of nodes) {
      let k = d.r ** 2;
      x += d.x * k;
      y += d.y * k;
      z += k;
    }
    return {x: x / z, y: y / z};
  }

const drag = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

function agarioTicked() {
    agarioSvg.selectAll('circle').data(agarioNodes).join(
        enter => enter.append('circle')
            .attr('r', d => 2* Math.sqrt(d.agent.wealth))   
            .attr('fill', d => groupDetails[d.group].color)
            .append("title").text(""),
        update => update.call(drag),
        exit => exit.remove()
    )
    .attr("cx", d => {
        d.x = Math.max(d.r, Math.min(agarioSvgWidth -4 - d.r, d.x));
        return d.x;
    })
    .attr("cy", d => {
        d.y = Math.max(d.r, Math.min(agarioSvgHeight -4 - d.r, d.y));
        return d.y;
    })
    .select("title").text(d => `Index: ${agarioNodes.indexOf(d)}\nWealth: ${Math.round(d.agent.wealth)}`);
}

function dragstarted(event, d) {
    if (!event.active) agarioSimulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) agarioSimulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function updateAgario() {
    agarioSimulation.nodes(agarioNodes);
    agarioTicked();
}

//updateAgario()