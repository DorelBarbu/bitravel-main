const express = require('express');
const router = express.Router();
const { insertGraph, getAllGraphs } = require('../controllers/graph');
const Response = require('../utils/response');

router.post('/graph', async (req, res) => {
  const { graph } = req.body;
  let response;
  try {
    const newGraph = await insertGraph(graph);
    response =  new Response(false, newGraph._doc, 'Successfully inserted graph');
  } catch(error) {
    response = new Response(true, null, 'Error inserting graph');
  }
  res.send(response);
});

router.get('/graph', async(req, res) => {
  let response;
  try {
    const graphs = await getAllGraphs();
    response = new Response(false, graphs, 'Successfully retrieved graphs');
  } catch(error) {
    response = new Response(true, null, 'Error retrieving graphs');
  }
  res.send(response);
});

module.exports = router;