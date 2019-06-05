let event = {
  active: false,
  event_name: "",
  song_titles: [],
  selected: null
};

export const get = (req, res, next) => sendJson(res, event);

export const post = (req, res, next) => {
  event = req.body;
  sendJson(res, event);
};

const sendJson = (res, json) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(json));
};
