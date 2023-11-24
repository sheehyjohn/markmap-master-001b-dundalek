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
 
        var transformedDataObject = {};  

        markdownFilesAll.forEach((file) => {
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
         // Your current data
         let data = {
            "depth": 1,
            "line": 0,
            "name": "markdownFilesAll01a",
            "children": [] // the children will be added later
        };

        markdownFilesAll.forEach((file) => {
            console.log('----processing file----');    

            var parsed = parse(file.contents);
            let transformed = transform(parsed); 
            console.log(transformed);

            console.log('----transformedUp file----');    
            incrementDepth(transformed);
            //console.log(transformed); 
            console.log('----children----');
            //console.log(transformed.children);

            let jsonObject = {
                "depth": 2,
                "line": 1,
                "name": file.filename,
                "children": transformed.children
            };
            console.log(jsonObject); 

           data.children.push(jsonObject);     // add the child to the root node
        });
 
       // Convert the data to a JSON string 
        fs.writeFileSync('../data/js-test02.json', JSON.stringify(data, null, 2));
   

        // Now you can use newRoot with D3.js 
        // also the visualisation
    })
    .catch(err => {
        console.error(err);
  });

  function incrementDepth(node) {
    node.depth += 1;
    if (node.children) {
      node.children.forEach(incrementDepth);
    }
    //return nodeUp
  }
 
// everytime obsidian saves a file, it will trigger this function

// Merge The Markdown Files to Create a Single edrawMind Map