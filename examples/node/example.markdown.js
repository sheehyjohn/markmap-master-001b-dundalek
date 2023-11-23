var fs = require('fs');
const path = require('path');
var parse = require('../../lib/parse.markdown');
var transform = require('../../lib/transform.headings');


////////////////////////////////////////////////////////////////////////////////
// Example of parsing a single markdown file and writing the output to a file.
var text = fs.readFileSync('../data/gtor.md', 'utf-8');
var headings = parse(text);
var root = transform(headings);

console.log(root);
 
fs.writeFileSync('../data/tree.json', JSON.stringify(root, null, 2)); 

console.log('-----');

////////////////////////////////////////////////////////////////////////////////
// read multiple markdown files
// wait for promises to resolve....

let markdownFilesAll = [];       

fs.promises.readdir('C:/code/obsidian/media-2307')
    .then(files => {
        let promises = files.map(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join('C:/code/obsidian/media-2307', file);
            
            return fs.promises.readFile(filePath, 'utf-8')
            .then(content => {
                let fileAndContents = {
                    filename: file,         // markdown file name
                    contents: content       // markdown file contents
                };
                
                markdownFilesAll.push(fileAndContents);
            });
        }
        });

    return Promise.all(promises);
    })
    // wait for all promises to resolve
    // then process the files
    .then(() => {  

        var transformedData = [];
        var transformedDataObject = {}; 

        markdownFilesAll.forEach(function(file) {
            console.log('----processing file----');    

            var parsed = parse(file.contents);
            let transformed = transform(parsed); 
        
            transformedDataObject[file.filename] = transformed; 
        });

                
        console.log('----transformedDataObject----');   
        //console.log(transformed);

        fs.writeFileSync('../data/js-test01.json', JSON.stringify(transformedDataObject, null, 2));
        console.log('----savedToOneJSON----'); 
        console.log();

        // above reads all the markdown into one json
        // yes I will put in a MongoDB sync fs.watch sync but let me prove the concept
        
        markdownFilesAll.forEach(function(file) {
            console.log('----processing file----');    

            var parsed = parse(file.contents);
            let transformed = transform(parsed); 
            console.log(transformed);




           // transformedDataObject[file.filename] = transformed; 
        });



        // Your current data
        let data = {
            "depth": 1,
            "line": 0,
            "name": "markdownFilesAll",
            // ... other properties ...
        };

        // Create a new root node
        let newRoot = {
            "depth": 0,
            "line": 0,
            "name": "newRoot",
            "children": [data]
        };





        // Now you can use newRoot with D3.js


        // also the visualisation
    })
    .catch(err => {
        console.error(err);
  });

  
 
// everytime obsidian saves a file, it will trigger this function