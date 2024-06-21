import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "5s", target: 1 },
    { duration: "10s", target: 3 },
    { duration: "5s", target: 1 },
  ],
  threshold: {
    // 99% of requests must finish within 1000ms
    http_req_duration: ["p(99) < 1000"],
  },
};

export default () => {
  http.get("http://app-name/");
  sleep(5);
};
