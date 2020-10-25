var scrap = require('scrap');
scrap('https://ip-dynamic.com', function (err, $) {
    console.log($('#signature')[0].attribs.value)
});
