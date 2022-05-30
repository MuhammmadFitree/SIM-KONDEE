const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/sendMassage", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const phones = req.body.detail.phones;
  //   console.log(phones);
  //   console.log(req.body);
  if (username !== "" && password !== "") {
    var dataA = JSON.stringify({
      username: username,
      password: password,
    });

    const options = {
      method: "post",
      url: "http://192.168.102.168:8080/authenticate",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataA,
    };

    axios(options)
      .then(function (response) {
        const result = JSON.stringify(response.data);
        if (result) {
          var dataSMS = JSON.stringify({
            account: "OSD",
            sender: "KONDEE",
            phones: phones,
          });
          const SendSMS = {
            method: "post",
            url: "http://192.168.102.168:8080/send",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + result,
            },
            data: dataSMS,
          };
          axios(SendSMS)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          return "Error";
        }
        // console.log();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  res.send("Success");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
