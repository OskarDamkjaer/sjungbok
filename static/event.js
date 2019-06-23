import { readFileSync } from "fs";
import path from "path";

let event = {
  active: false,
  name: "tomt",
  song_titles: []
};

const passwords = readFileSync(
  path.resolve(__dirname, "./passwords.txt"),
  "utf8"
);
console.log(passwords);

export const get = (req, res, next) => sendJson(res, event);

export const post = (req, res, next) => {
  if (req.body.password === process.env.SJUNGPASS) {
    const copy = req.body;
    delete copy.password;
    event = copy;
  }
  sendJson(res, event);
};

const sendJson = (res, json) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(json));
};
