const Graph = require('../schema/graph');

const insertGraph = async graphData => {
  var graph = new Graph(graphData);
  return graph.save();
};

const getAllGraphs = async () => {
  var graphs = await Graph.find();
  return graphs;
};

module.exports = {
  insertGraph,
  getAllGraphs
};