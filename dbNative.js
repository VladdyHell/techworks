// index.js in the root directory
import app from "./server.js";
import mongodb from "mongodb";
import config from "config";

const db = config.get("mongoURI");

const { MongoClient } = mongodb;

const port = process.env.PORT || 8000;

(async () => {
  let client;
  try {
    client = await MongoClient.connect(db, {
      useNewUrlParser: true,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    });
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  } finally {
    // console.log(client);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
})();
