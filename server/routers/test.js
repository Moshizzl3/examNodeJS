var formdata = new FormData();
const fileInput =["server/routers/TS2010PIC81043577.jpg"]
formdata.append("file", fileInput.files[0], "server/routers/TS2010PIC81043577.jpg");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://apim.mushroomscan.com/api/predict", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));