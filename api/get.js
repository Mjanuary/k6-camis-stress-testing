import http from "k6/http";
import { SharedArray } from "k6/data";

export const options = {
  vus: 1,
  duration: "10s",
  iterations: 5,
};

var data = new SharedArray("colors", function () {
  return [
    "blue",
    "green",
    "skin",
    "red",
    "red",
    "sport",
    "magic",
    "geek",
    "black",
  ];
});

export default () => {
  var randomTag = data[Math.floor(Math.random() * data.length)];

  let response = http.get(`http://localhost:4040/stress?tags=${randomTag}`);
  console.log(
    `VU ID: ${__VU} - URL: ${response.url} - Status Code: ${response.status}`
  );
  //   sleep(5);
};
