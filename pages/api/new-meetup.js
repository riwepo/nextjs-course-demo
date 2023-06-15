import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { id, title, image, address, decription } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://riwepoau:urJXfmPpBuKw7xVa@cluster0.klmzqfg.mongodb.net/"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
