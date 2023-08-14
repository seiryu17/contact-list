const path = require("path");

require("module-alias/register");

require("module-alias").addAlias("@", path.join(__dirname, "../src"));

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});
