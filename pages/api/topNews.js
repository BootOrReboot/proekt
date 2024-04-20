import connection from "./mongoDB";

export default async function top(req, res) {
  const user = JSON.parse(req.body);

  const client = await connection();
  const base = client.db("baza");
  if (user.site === "news") {
    if (user.lang === "al") {
      const collection2 = base.collection("projectsAL");
      const allDocs = await collection2.find({}).toArray();

      res.status(200).json({ message: allDocs });
    } else {
      const collection = base.collection("projects");
      const allDocs = await collection.find({}).toArray();

      res.status(200).json({ message: allDocs });
    }
  } else {
    if (user.lang === "al") {
      const collection2 = base.collection("projectsAL");
      const allDocs = await collection2.find({}).toArray();
      const topID = allDocs.map((el) => {
        return el.id;
      });
      const num = Math.max(...topID) - 3;
      const top3 = await collection2.find({ id: { $gt: num } }).toArray();
      res.status(200).json({ message: top3 });
    } else {
      const collection = base.collection("projects");

      const allDocs = await collection.find({}).toArray();
      const topID = allDocs.map((el) => {
        return el.id;
      });
      const num = Math.max(...topID) - 3;
      const top3 = await collection.find({ id: { $gt: num } }).toArray();
      res.status(200).json({ message: top3 });
    }
  }
}
