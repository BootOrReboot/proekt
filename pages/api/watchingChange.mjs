import express from "express";
import { MongoClient } from "mongodb";
import { Server } from "socket.io";

async function connection() {
  const uri =
    "mongodb+srv://sole:qPXBDauCAycblxys@baza.oictv7c.mongodb.net/?retryWrites=true&w=majority&appName=baza";

  const client = new MongoClient(uri);

  client.connect();
  return client;
}

const app = express();
const port = 3001;

const dbName = "baza";
const collectionName = "Professors";

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
const io = new Server(server, { cors: "*" });

async function connectAndSetupChangeStream() {
  try {
    const client = await connection();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const changeStream = collection.watch([
      {
        $match: {
          operationType: "insert",
        },
      },
    ]);

    // Listen for changes in the collection
    changeStream.on("change", (change) => {
      console.log("Change detected:", change);
      // Send response back to the client
      // For example, you can send JSON data
      io.emit("data", "Data has been changed"); // assuming you use socket.io for real-time communication
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectAndSetupChangeStream();

// Express route to handle requests
app.get("/", (req, res) => {
  res.send("Hello World!");
});
