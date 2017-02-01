const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const path = require("path");

const app = express();
const port = 3000

app.use(cors())
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}));

/*** SERVISI ***/

/*
Upisuje pozicije
@param json pozicije: objekat sa pozicijama editor elemenata
*/
app.post('/pozicije', function(req, res) {
    var pozicije = req.body.pozicije;
    fs.writeFile('./src/komponente/editor/pozicije.json', pozicije, function() {
      res.send('pozicije sacuvane')
    })
});

/*
Upisuje podatke
@param string ishod: novi identifikator izbora
@param string lokacija: putanja do maticnog fajla
@param number index: index izbora
@param string fajl: naziv json fajla
*/
app.post('/podaci', function(req, res) {
    const {ishod, lokacija, index, fajl} = req.body
    var imeFajla = path.basename(`${lokacija}`)
    var direktorij = lokacija.replace(imeFajla, '')
    var modelPutanja = `./${direktorij}${fajl}`
    var model = JSON.parse(fs.readFileSync(modelPutanja, 'utf8'));
    model.izbori[index].link = ishod;
    fs.writeFile(modelPutanja, JSON.stringify(model), function() {
      res.send(`azurirano`)
    })
});

/*
Pravi novu scenu (nezavrseno)
*/
app.post('/novascena', function(req, res) {
    var podaci = req.body.podaci;
    res.send(podaci)
});

/*** START ***/

app.listen(port, function () {
  console.log(`Razvojni nodejs server trci na http://localhost:${port}/`)
})
