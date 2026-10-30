const { mount } = require("./lib/mount");
module.exports = mount(require("../netlify/functions/subscribe-lead").handler);
