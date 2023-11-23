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
 
var fileListAll = []; 

fs.readdir('C:/code/obsidian/media-2307', (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join('C:/code/obsidian/media-2307', file);
            console.log(file); 
             
            fs.readFile(filePath, 'utf-8', (err, content) => {
                if (err) throw err;
                
               // Create a new fileAndContents object for this file
                let fileAndContents = {
                    filename: file,
                    contents: content
                };
                console.log(fileAndContents)
                fileListAll.push(fileAndContents);
                //console.log(fileListAll); 

                //console.log(content); // This will log the content of each .md file
            });
        }
    });
    fileListAllConsole();
    //console.log('----fileListAll'); 
    //console.log(fileListAll); 
     
});



function fileListAllConsole() {
    console.log('---fileListAllConsole()---');
   

}