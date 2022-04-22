const log4js = require("log4js");
log4js.configure({
  appenders: { 
    cheese: { type: "file", filename: "cheese.log" } ,
    app: { type: "file", filename: "log/app.log" } 
  },
  categories: { default: { appenders: ["app"], level: "DEBUG" } }
});
const logger = log4js.getLogger("app");

export default logger;
