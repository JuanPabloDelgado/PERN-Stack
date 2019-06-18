const express = require("express");
const cors = require("cors");
import { createConnection } from "typeorm";
import routes from "./routes";
const typeormConfig = require("../ormconfig.json");

createConnection(typeormConfig)
  .then(connection => {
    console.log("Connection to BD done");
  })
  .catch(error => console.log(error));

const app = express();
app.use(cors());
app.use(express.json());
app.set("port", 5000);

app.use("/users", routes.user);

// Server up and running in the stablished port
app.listen(app.get("port"), () => {
  console.log(`Server running at port ${app.get("port")}`);
});
