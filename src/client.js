import * as sapper from "@sapper/app";

sapper.start({
  target: document.querySelector("#sapper")
});

if (!active) {
  sapper.goto("songs");
}
