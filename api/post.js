import http from "k6/http";
import { SharedArray } from "k6/data";
import { open } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
  iterations: 5,
};

var data = new SharedArray("credentials", function () {
  return [
    { username: "user-one", password: "password-value", token: "fake-token-1" },
    { username: "user-two", password: "password-value", token: "fake-token-2" },
  ];
});

export default () => {
  var { username, password, token } =
    data[Math.floor(Math.random() * data.length)];

  let payload = JSON.stringify({ username, password });

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let response = http.post("http://localhost:4040/stress-post", payload, {
    headers,
  });
  console.log(
    `VU ID: ${__VU} - Username: ${username} - Password: ${password} - Token: ${token} - Status Code: ${response.status}`
  );

  console.log({ response });
  //   // Write the response to a file
  //   open(`./response_${__VU}_${__ITER}.json`, "w").write(
  //     JSON.stringify(response)
  //   );
};
