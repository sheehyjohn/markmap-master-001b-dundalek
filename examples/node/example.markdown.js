var fs = require('fs');
var parse = require('../../lib/parse.markdown');
var transform = require('../../lib/transform.headings');

var text = fs.readFileSync('../data/gtor.md', 'utf-8');

var headings = parse(text);
var root = transform(headings);

console.log(root);

fs.writeFileSync('../data/tree.json', JSON.stringify(root, null, 2));

// var parse = require('../parse.pandoc');
// parse.async(text, 'markdown', function(err, headings) {
//   var root = transform(headings);
//
//   //console.log(root);
//
//   fs.writeFileSync('gtor.json', JSON.stringify(root));
// });

console.log('-----');

// readDir() for all markdown files
fs.readdir('C:/code/obsidian/media-2307', (err, files) => {
    if (err) throw err;
    console.log(files);
 
    addToMap(); 


  });


function addToMap(){
    console.log('add to map');

}

  