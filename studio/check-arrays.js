const fs = require('fs');

let fileContent = fs.readFileSync('all_docs.json', 'utf8');

// The sanity CLI usually prints things like "--api-version not specified".
// Find the first '[' or '{' to start parsing JSON
const jsonStart = Math.min(
  fileContent.indexOf('[') !== -1 ? fileContent.indexOf('[') : Infinity,
  fileContent.indexOf('{') !== -1 ? fileContent.indexOf('{') : Infinity
);

if (jsonStart === Infinity) {
  console.error("No JSON found in file");
  process.exit(1);
}

const jsonContent = fileContent.slice(jsonStart);
const data = JSON.parse(jsonContent);

const arrayFields = ['sections', 'gallery', 'details', 'items', 'navLinks', 'seoKeywords', 'mainMenu', 'socialLinks', 'services', 'staff', 'testimonials'];

let errors = 0;

data.forEach(doc => {
  const checkObject = (obj, path) => {
    if (!obj || typeof obj !== 'object') return;
    
    for (const key of Object.keys(obj)) {
      if (arrayFields.includes(key)) {
        const val = obj[key];
        if (val !== null && val !== undefined && !Array.isArray(val)) {
          console.error(`ERROR: Document ${doc._id} (${doc._type}) has non-array value for "${path ? path + '.' : ''}${key}". Type is ${typeof val}.`);
          console.error(JSON.stringify(val, null, 2));
          errors++;
        }
      }
      
      // recurse
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        checkObject(obj[key], path ? `${path}.${key}` : key);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          if (typeof item === 'object') {
            checkObject(item, `${path ? path + '.' : ''}${key}[${index}]`);
          }
        });
      }
    }
  };
  
  checkObject(doc, '');
});

if (errors === 0) {
  console.log("No non-array values found! All array fields are correct.");
} else {
  console.log(`Found ${errors} format errors in documents!`);
}
