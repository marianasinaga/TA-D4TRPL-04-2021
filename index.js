const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public/"));
app.listen('3000', function(){
    console.log('web service pada 3000. http://localhost:3000/');
});

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
  });
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const dialogflowFulfillment = (request, response) =>{
    const agent = new WebhookClient({request,response})


    function searchAkomodasiHandler(file,callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.$typeakomodasi === "Guest House" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Guest House" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Penginapan" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Penginapan" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Resort" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Hotel" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Homestay" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Homestay" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Cottage" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Cottage" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Villa" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Villa" && rawFile==="$Kabupaten");
          }
          else
              console.log("Maaf, informasi yang kamu cari tidak ditemukan");
      }
      rawFile.send(null);
  }

    function searchPariwisataHandler(file,callback){
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.$typeakomodasi === "Wisata Alam" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Wisata Alam" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Wisata Rekreasi" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Wisata Rekreasi" && rawFile==="$Kabupaten");
          }
          if (rawFile.$typeakomodasi === "Wisata Kuliner" && rawFile.kabupaten == true) {
                callback(rawFile.$typeakomodasi==="Wisata Kuliner" && rawFile==="$Kabupaten");
          }
          else
              console.log("Maaf, informasi yang kamu cari tidak ditemukan");
      }
      rawFile.send(null);
  }

    function detailAkomodasiHandler(){
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
        if ($Akomodasi==true) {
            callback(rawFile.Nama.$Akomodasi);
            callback(rawFile.Kecamatan.$Akomodasi);
            callback(rawFile.Alamat.$Akomodasi);
            callback(rawFile.actionLink.$Akomodasi);
        }
        else
          console.log("Maaf, informasi yang kamu cari tidak ditemukan");
    }
    rawFile.send(null);
}
    function detailPariwisataHandler(){
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
        if ($Pariwisata==true) {
            callback(rawFile.Nama.$Pariwisata);
            callback(rawFile.Kecamatan.$Pariwisata);
            callback(rawFile.Alamat.$Pariwisata);
            callback(rawFile.actionLink.$Pariwisata);
        }
        else
          console.log("Maaf, informasi yang kamu cari tidak ditemukan");
    }
    rawFile.send(null);
}
    let intentMap = new Map();
    intentMap.set('SearchAkomodasi', searchAkomodasiHandler);
    intentMap.set('SearchPariwisata', searchPariwisataHandler);
    intentMap.set('DetailAkomodasi', detailAkomodasiHandler);
    intentMap.set('DetailPariwisata', detailPariwisataHandler);
    agent.handleRequest(intentMap);

    readTextFile("/D4TI/SEMESTER8/1144290-FinalProjectII/TobaBot.json", function(TobaBot){
      var data = JSON.parse(TobaBot);
      console.log(data);
  });

  }
