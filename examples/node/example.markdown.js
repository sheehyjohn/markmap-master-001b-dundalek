var fs = require('fs');
const path = require('path');
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
 
let fileListAll = []; 


fs.promises.readdir('C:/code/obsidian/media-2307')
  .then(files => {
    let promises = files.map(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join('C:/code/obsidian/media-2307', file);
        
        return fs.promises.readFile(filePath, 'utf-8')
          .then(content => {
            let fileAndContents = {
              filename: file,
              contents: content
            };
            
            fileListAll.push(fileAndContents);
          });
      }
    });

    return Promise.all(promises);
  })
  .then(() => {
    fileListAllConsole();
  })
  .catch(err => {
    console.error(err);
  });




function fileListAllConsole() {
    console.log('---fileListAllConsole()---');
    console.log(fileListAll)
   

}