import connection from "./mongoDB";

export default async function addSecond(req, res) {
  const info = JSON.parse(req.body);
  const client = await connection();
  const base = client.db("baza");
  if (info.lang) {
    const collection = base.collection("projects");
    const allDocs = await collection.find({}).toArray();
    const ids = allDocs.map((el) => {
      return el.id;
    });
    const latestNews = Math.max(...ids);
    const finding = await collection.findOne({ id: latestNews });
    collection.updateOne(
      { id: latestNews },
      { $set: { image: finding.image.concat(info.chunk) } }
    );

    console.log(latestNews);

    res.status(200).json({ data: "working" });
  } else {
    const collection = base.collection("projectsAL");
    const allDocs = await collection.find({}).toArray();
    const ids = allDocs.map((el) => {
      return el.id;
    });
    const latestNews = Math.max(...ids);
    const finding = await collection.findOne({ id: latestNews });
    collection.updateOne(
      { id: latestNews },
      { $set: { image: finding.image.concat(info.chunk) } }
    );

    console.log(latestNews);

    res.status(200).json({ data: "working" });
  }
}
