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
        console.log('---then()---');
 

        var a = parse(fileListAll[0].contents);
        var b = transform(a);
        fs.writeFileSync('../data/js-test01-onefile.json', JSON.stringify(b, null, 2));

    // console.log(b)


        var transformedData = [];
        var transformedDataObject = {};
        var parsedAll = {};

        fileListAll.forEach(function(file) {
            console.log('----processing file----');   
        //  console.log(file);

            var parsed = parse(file.contents);
            let transformed = transform(parsed);

            // console.log(transformed);
            transformedDataObject[file.filename] = transformed;
            //transformedData.push(transformed);
        });

        console.log(transformedData);

        // transformedDataObject = transformedData;
        
        console.log('----transformedDataObject----');   
        //console.log(transformed);

        fs.writeFileSync('../data/js-test01.json', JSON.stringify(transformedDataObject, null, 2));
    })
    .catch(err => {
        console.error(err);
  });

 