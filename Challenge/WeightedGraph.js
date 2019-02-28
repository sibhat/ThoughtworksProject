class Node {
  constructor(val) {
    this.val = val;
  }
}
class Queue {
  constructor() {
    this.values = [];
    this.size = 0;
  }
  enqueue(val, priority) {
    this.values.push({ val: val, priority });
    this.size++;
    this.sort();
  }
  dequeue() {
    this.size--;

    return this.values.shift();
  }
  sort() {
    this.values.sort((v1, v2) => v1.priority < v2.priority);
  }
}
class WeightedGraph {
  constructor() {
    this.adjacentList = {};
  }
  addVertex(v) {
    if (this.adjacentList[v]) return "Vertex all ready exist!";
    this.adjacentList[v] = [];
  }
  addEdges(v1, v2, weight) {
    if (!this.adjacentList[v1] || !this.adjacentList[v2])
      return "Please provide two correct vertex";
    this.adjacentList[v1].push({ node: v2, weight });
    this.adjacentList[v2].push({ node: v1, weight });
    return `Edge added between ${v1} and ${v2}`;
  }
  dijkstra(v1, end) {
    let visited = {},
      prev = {},
      shortDist = {},
      result = [],
      queue = new Queue();
    for (let key in this.adjacentList) {
      prev[key] = null;
      if (key === v1) {
        shortDist[key] = 0;
        queue.enqueue(key, 0);
      } else {
        shortDist[key] = Infinity;
        queue.enqueue(key, Infinity);
      }
    }
    // console.log(shortDist);
    while (queue.size) {
      let node = queue.dequeue();
      if (node.val === end) {
        let accNode = node.val;
        console.table({ prev });
        console.table({ shortDist });
        while (accNode) {
          result.push(accNode);
          accNode = prev[accNode];
        }
        return result.reverse();
      }

      if (!visited[node.val]) {
        visited[node.val] = true;
        let children = this.adjacentList[node.val];
        for (let childIndex in children) {
          let child = children[childIndex];

          let total = child.weight;
            if (prev[node.val]) {
            total += shortDist[node.val];
          }
          console.log(`from ${node.val} => ${child.node} prev => ${prev[node.val]}`);
          console.log(
            `total is ${total} shortdist is ${shortDist[child.node]}`
          );
          if (total < shortDist[child.node]) {
            shortDist[child.node] = total;
            prev[child.node] = node.val;
            queue.enqueue(child.node, total);
          }
        }
      }
    }
    return result.reverse();
  }
}

let g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdges("A", "B", 4);
g.addEdges("A", "C", 8);
g.addEdges("B", "D", 5);
g.addEdges("C", "E", 4);
g.addEdges("D", "F", 13);
g.addEdges("E", "D", 4);
g.addEdges("E", "F", 9);

console.log(g.dijkstra("A", "F"));
