var fs = require('fs');
const path = require('path');
var parse = require('../../lib/parse.markdown');
var transform = require('../../lib/transform.headings');

var text = fs.readFileSync('../data/gtor.md', 'utf-8');

var headings = parse(text);
var root = transform(headings);

console.log(root);

//fs.writeFileSync('../data/tree.json', JSON.stringify(root, null, 2));
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
let MarkdownAll = [];

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


    // The function above has read all the markdown files in the directory and stored them in an array of objects.
    // The objects have two properties: filename and contents.
    // The contents property is the text of the markdown file.
    // The filename property is the name of the markdown file.
    // The array of objects is called fileListAll.
    

    // the function below needs to convert each element of fileListAll to a string and then pass it to the parse function.
    // The parse function will return an array of objects.

function fileListAllConsole() {
    console.log('---fileListAllConsole()---');
  //  console.log(fileListAll)

    // write a loop to go through all the fileListAll
    // for each element of fileListAll, convert it to a string and pass it to the parse function.
    // the parse function will return an array of objects.

   // console.log('----reads one file----');   

   // console.log(fileListAll[0]);

    var a = parse(fileListAll[0].contents);
    var b = transform(a);
    fs.writeFileSync('../data/js-test01-onefile.json', JSON.stringify(b, null, 2));

   // console.log(b)


    var transformedData = [];
    var transformedDataObject = {};

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

 
    

}