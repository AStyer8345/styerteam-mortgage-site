const { bridge } = require("./netlify-bridge");

function mount(handler) {
  return (req, res) => bridge(handler, req, res);
}

module.exports = { mount };
