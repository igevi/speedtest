/* TODO Implement config file @ /etc/speedtest/conf.json */

const speedTest = require('speedtest-net')
const test = speedTest({
    maxTime: 5000
})
const fs = require('fs')
const plotly = require('plotly')(process.env.API_USER, process.env.API_KEY)
const graphType = "scatter"
const graphOptions = {
    filename: "date-axes",
    fileopt: "overwrite"
}

const outputFilePath = './data.json' // replace with config


/* Move this function to another module (maybe with the getTime() function)
to create an auxiliary module for helper functions */

getTime = () => {
    let date = new Date()
    
    let year = date.getFullYear()
    
    let month = date.getMonth() + 1
    month = (month < 10 ? "0" : "") + month

    let day = date.getDate()
    day = (day < 10 ? "0" : "") + day

    let hour = date.getHours()
    hour = (hour < 10 ? "0" : "") + hour

    let minute = date.getMinutes()
    minute = (minute < 10 ? "0" : "") + minute

    let second = date.getSeconds()
    second = (second < 10 ? "0" : "") + second

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

parseData = () => {
    let jsonData = JSON.parse(fs.readFileSync(outputFilePath))
    let x_data = jsonData.map(elem => elem.time)
    let yUpData = jsonData.map(elem => elem.upload)
    let yDownData = jsonData.map(elem => elem.download)

    return [{
        x: x_data,
        y: yDownData,
        type: graphType
    },
    {
        x: x_data,
        y: yUpData,
        type: graphType
    }]
}

testSpeed = () => {
    test.on('data', data => {
        speedData = {
            "time": getTime(),
            "download": data.speeds.download,
            "upload": data.speeds.upload
        }

        try {
            data = fs.readFileSync(outputFilePath)
            obj = JSON.parse(data);
            obj.push(speedData);
            fs.writeFileSync(outputFilePath, JSON.stringify(obj))
        }
        catch(err) {
            objList = [speedData]
            fs.writeFileSync(outputFilePath, JSON.stringify(objList));
        }

        data = parseData()
        plotly.plot(data, graphOptions, (err, msg) => {
            if (err) throw err
            console.log(msg)
        })
    })

    test.on('error', err => {
        console.error(err)
    })
}

testSpeed()