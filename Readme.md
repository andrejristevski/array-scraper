# array-scraper

array-scraper is a module that let us download array of urls in sequential manner and returns success bodies and errors.

### Example Usage

```
let arrayScrapper = require('array-scraper');
let options = {
    timeout: 50, //timeout between http calls 
    logtotal: false
}

arrayScrapper(urls, function (successBodies, errors) {

} , ? options);

```
