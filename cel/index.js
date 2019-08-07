
const fs = require('fs');

const express = require('express')
const app = express()
const port = 3000

const csvFilePath='users_export__201908061820.csv'


var dbDate = [{"Country": "US", "Year": "2002", "GDP": "10.98"},
{"Country": "China", "Year": "2002", "GDP": "1.45"},
{"Country": "Japan", "Year": "2002", "GDP": "3.98"},
{"Country": "Germany", "Year": "2002", "GDP": "2.01"},
{"Country": "France", "Year": "2002", "GDP": "1.45"},
{"Country": "United Kingdom", "Year": "2002", "GDP": "1.62"},
{"Country": "Brazil", "Year": "2002", "GDP": "0.50"},
{"Country": "Russian Federation", "Year": "2002", "GDP": "0.35"},
{"Country": "Italy", "Year": "2002", "GDP": "1.23"},
{"Country": "India", "Year": "2002", "GDP": "0.52"},
{"Country": "US", "Year": "2012", "GDP": "16.24"},
{"Country": "China", "Year": "2012", "GDP": "8.23"},
{"Country": "Japan", "Year": "2012", "GDP": "5.94"},
{"Country": "Germany", "Year": "2012", "GDP": "3.43"},
{"Country": "France", "Year": "2012", "GDP": "2.61"},
{"Country": "United Kingdom", "Year": "2012", "GDP": "2.46"},
{"Country": "Brazil", "Year": "2012", "GDP": "2.25"},
{"Country": "Russian Federation", "Year": "2012", "GDP": "2.02"},
{"Country": "Italy", "Year": "2012", "GDP": "2.01"},
{"Country": "India", "Year": "2012", "GDP": "1.86"}];

let csvToJson = require('convert-csv-to-json');
 /*
let json = csvToJson.getJsonFromCsv(csvFilePath);
for(let i=0; i<json.length;i++){
    dbDate.push(json[i]);
}*/

app.get('/', function (req, res) {
    console.log(dbDate);
    console.log("ping");
    res.send(dbDate);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))