const { mount } = require("./lib/mount");
module.exports = mount(require("../netlify/functions/lead-intake").handler);
