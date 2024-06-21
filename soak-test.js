/**
 * Soak test will allow you to increase the active users on the application based on time
 * @param duration: the the time (start from the moment you run the test) ex: on minute one
 * @param target: the active connections at that specific time
 */

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 200 },
    { duration: "2m", target: 500 },
    { duration: "4m", target: 800 },
    { duration: "5m", target: 800 },
    { duration: "6m", target: 1000 },
    { duration: "7m", target: 5000 },
    { duration: "8m", target: 0 },
  ],
};

export default () => {
  http.get("http://app-name/");
  sleep(5);
};
