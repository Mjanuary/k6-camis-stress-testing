import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
};

export default () => {
  http.get("http://app-name/");
  sleep(5);
};
