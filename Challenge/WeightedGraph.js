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
    this.values.push({ val, priority });
    this.size++;
    this.sort();
  }
  dequeue() {
    let node = this.values.shift();
    this.size--;
    this.sort();
    return node;
  }
  sort() {
    this.values.sort((v1, v2) => v1.priority - v2.priority);
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
  addDirectedEdge(v1, v2, weight) {
    if (!this.adjacentList[v1] || !this.adjacentList[v2])
      return "Please provide two correct vertex";
    this.adjacentList[v1].push({ node: v2, weight });
    return `Edge added between ${v1} and ${v2}`;
  }
  distance(arry) {
    //
    let idx = 0,
      start = arry[idx],
      node,
      distanceLength = 0,
      end = arry[arry.length - 1];
    if (!this.adjacentList[start] || !this.adjacentList[end])
      return "NO SUCH ROUTE";
    while (idx < arry.length) {
      node = arry[idx];
      let neighbors = this.adjacentList[node];
      if (node === end) break;
      idx++;
      node = arry[idx];
      let found = false;
      for (let index in neighbors) {
        let neighbor = neighbors[index];
        if (neighbor.node === node) {
          distanceLength += neighbor.weight;
          found = true;
          break;
        }
      }
      if (!found) {
        return "NO SUCH ROUTE";
      }
    }
    return distanceLength;
  }
  tripNumber(start, end, num) {
    if (!this.adjacentList[start] || !this.adjacentList[end])
      return "NO SUCH ROUTE";
    let length = 0;
    let trip = 0;
    let path = [];
    let node;
    let stack = [start];
    let neighbors;
    let ans = 0;
    while (stack.length && trip <= num) {
      node = stack.pop();
      path.push(node);
      trip++;
      neighbors = this.adjacentList[node];
      console.log(node, trip);
      for (let index in neighbors) {
        let item = neighbors[index];
        if (item.node === end) {
          path.push(item.node);
          console.log("path are", path);
          path = path.splice(1, -1);
          ans++;
          //   return trip;
        } else {
          stack.push(item.node);
        }
      }
    }
    return ans || "NO ROUTE FOUND!";
  }
  dijkstra(v1, end) {
    if (!this.adjacentList[v1] || !this.adjacentList[end])
      return "Please provide two correct vertex";
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
    //   console.table(queue.values);
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
          console.log(
            `from ${node.val} => ${child.node} prev => ${prev[node.val]}`
          );
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
  dfs(currNode, e, visited, path, resutl) {
    path.push(currNode);
    visited[currNode] = true;
    let neighbors = this.adjacentList[currNode];
    for (let index in neighbors) {
      let neighbor = neighbors[index];
      if (neighbor.node === e) {
        resutl.push([...path, ...e]);
      } else if (!visited[neighbor.node]) {
        this.dfs(neighbor.node, e, visited, path, resutl);
      }
    }
    path.pop();
    visited[currNode] = false;
  }
  allPath(start, end) {
    if (!this.adjacentList[start] || !this.adjacentList[end])
      return "NO SUCH ROUTE";
    let visited = {};
    let path = [];
    let resutl = [];

    this.dfs(start, end, visited, path, resutl);
    console.table(resutl);
    return resutl;
  }
}

let g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
// g.addVertex("F");

// g.addEdges("A", "B", 4);
// g.addEdges("A", "C", 8);
// g.addEdges("B", "D", 3);
// g.addEdges("C", "E", 4);
// g.addEdges("D", "F", 13);
// g.addEdges("E", "D", 4);
// g.addEdges("E", "F", 9);
g.addDirectedEdge("A", "B", 5);
g.addDirectedEdge("B", "C", 4);
g.addDirectedEdge("C", "D", 8);
g.addDirectedEdge("D", "C", 8);
g.addDirectedEdge("D", "E", 6);
g.addDirectedEdge("A", "D", 5);
g.addDirectedEdge("C", "E", 2);
g.addDirectedEdge("E", "B", 3);
g.addDirectedEdge("A", "E", 7);

// console.log(g.dijkstra("A", "F"));
// console.log("Distance is ", g.distance(["A", "B", "C"]));
// console.log("Distance is ", g.distance(["A", "D"]));
// console.log("Distance is ", g.distance(["A", "D", "C"]));
// console.log("Distance is ", g.distance(["A", "E", "B", "C", "D"]));
// console.log("Distance is ", g.distance(["A", "E", "D"]));
// console.log("#8 dijkstra is ", g.dijkstra("A", "C"));
// console.log("#9 dijkstra is ", g.dijkstra("B", "B"));
// console.log("#9 dijkstra is ", g.tripNumber("A", "C", 4));
console.log("allPath is ", g.allPath("A", "C"));
