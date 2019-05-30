import * as sapper from "@sapper/app";
import { active } from "../static/event.json";

sapper.start({
  target: document.querySelector("#sapper")
});

if (!active) {
  sapper.goto("songs");
}
