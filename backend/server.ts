const express = require("express");
const cors = require("cors");
import { createConnection } from "typeorm";
import entities from "./entities";

createConnection({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "Test",
  entities: [entities.User]
})
  .then(connection => {
    console.log("Connection to BD done");
  })
  .catch(error => console.log(error));

const app = express();
app.use(cors());
app.use(express.json);
app.set("port", 5000);

import routes from "./routes";

app.use("/users", routes.user);

// Server up and running in the stablished port
app.listen(app.get("port"), () => {
  console.log(`Server running at port ${app.get("port")}`);
});
