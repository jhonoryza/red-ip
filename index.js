const fetch = require('node-fetch')
var FormData = require('form-data');
const { delay } = require('lodash');
const log = require('simple-node-logger').createSimpleLogger('project.log');
// let ip = 131174112652

let base = 131174112400
let index = 0;
var url = 'https://ip-dynamic.com/home/getUsageOnline'

getApi(url, base, index)

function getApi(url, base, index) {
    if (index == 300)
        return

    const params = new FormData();
    const indihomeIp = base + index
    params.append('no_indihome', `${indihomeIp}`);
    params.append('signature', '6362aaf1b46ef9ccfd4d8dd292deb8a1');

    fetch(url, {
        method: 'post',
        body: params
    }).then((response) => {
        response.text().then(function (data) {
            if (data != 0) {
                var kuy = `${(base + index)}: http://${data}`;
                log.info(kuy)
            }
        })
        index++
        getApi(url, base, index)
    }).catch((err) => {
        index++
        getApi(url, base, index)
        return null
    })
}