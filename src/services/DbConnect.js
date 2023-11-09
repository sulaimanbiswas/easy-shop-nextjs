import { MongoClient, ServerApiVersion } from "mongodb";

/**
 * @type {import("mongodb").Db}
 */

let db;

const DbConnect = async () => {
  if (db) return db;
  try {
    const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ovxjb0p.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    db = client.db(process.env.MONGO_DB_NAME);
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return db;
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    throw new Error("Could not connect to MongoDB");
  }
};

export default DbConnect;
