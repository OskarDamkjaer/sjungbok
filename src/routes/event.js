const EventEmitter = require("events");
const Stream = new EventEmitter();
let event = {
  active: false,
  event_name: "",
  song_titles: [],
  selected: null
};

export const get = async (req, res, next) => {
  // Setup an event stream
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache"
  });

  function onPush(event, data) {
    res.write(`data: ${data} \n\n`);
  }

  Stream.on("push", onPush);

  req.on("close", function() {
    Stream.removeListener("push", onPush);
  });

  // Give list to new clients
  sendList();
  sendJson(res, event);
};

export const post = (req, res, next) => {
  event = req.body;
  sendList();
  sendJson(res, event);
};

const sendJson = (res, json) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(json));
};

const sendList = () => Stream.emit("push", "event", JSON.stringify(event));
