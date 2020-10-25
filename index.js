const fetch = require('node-fetch')
var FormData = require('form-data');
const connectionTester = require('connection-tester');
const log = require('simple-node-logger').createSimpleLogger('project.log');
// let ip = 131174112653

let base = 131174112652
let index = 0;
var url = 'https://ip-dynamic.com/home/getUsageOnline'

getApi(url, base, index)

function getApi(url, base, index) {
    if (index == 300)
        return

    const indihomeIp = base + index
    const params = new FormData();
    params.append('no_indihome', `${indihomeIp}`);
    params.append('signature', '6362aaf1b46ef9ccfd4d8dd292deb8a1');
    //staging 541045b6d5a72528406c021abe4bf06
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