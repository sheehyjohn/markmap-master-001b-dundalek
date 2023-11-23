const d3 = require('d3');
require('../../lib/d3-flextree');
const markmap = require('../../lib/view.mindmap');

console.log('-----');


d3.json("../data/tree.json", function(error, data) {
  if (error) throw error;

  markmap('svg#mindmap', data, {
    preset: 'colorful', // or default
    linkShape: 'diagonal' // or bracket
  });
});
