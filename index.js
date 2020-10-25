const fetch = require('node-fetch')
var FormData = require('form-data');
const connectionTester = require('connection-tester');
const log = require('simple-node-logger').createSimpleLogger('project.log');
var scrap = require('scrap');

let signature = '6362aaf1b46ef9ccfd4d8dd292deb8a1';
scrap('https://ip-dynamic.com', function (err, $) {
    signature = $('#signature')[0].attribs.value || signature
});

// let ip = 131174112653

let base = 131174112652
let index = 0;
var url = 'https://ip-dynamic.com/home/getUsageOnline'

getApi(url, base, index)

function getApi(url, base, index) {
    if (index == 100)
        return

    const indihomeIp = base + index
    const params = new FormData();
    params.append('no_indihome', `${indihomeIp}`);
    params.append('signature', signature);
    fetch(url, {
        method: 'post',
        body: params
    }).then((response) => {
        response.text().then(function (data) {
            if (data != 0) {
                console.log(indihomeIp)
                connectionTester.test(
                    data,
                    80,
                    1500,
                    (err, output) => {
                        if (output.success == true) {
                            var kuy = `${indihomeIp}: http://${data}`;
                            log.info(kuy)
                        } else {
                            console.log('port 80 closed')
                        }
                    }
                );
            }
        })
        index++
        getApi(url, base, index)
    }).catch((err) => {
        console.log('failed')
        index++
        getApi(url, base, index)
        return null
    })
}