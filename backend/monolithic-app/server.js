const api = require("./api");

api.set("port", process.env.PORT || 3000);

api.listen(api.get("port"), () => {
  console.log(`El servidor arrancó en el puerto ${api.get("port")}`);
});
