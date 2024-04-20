import connection from "./mongoDB";

export default async function insert(req, res) {
  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("projects");
  const allDocs = await collections.find({}).toArray();
  const collection2 = base.collection("projectsAL");
  allDocs.map((el) => {
    collection2.insertOne(el);
  });
  const image = await collections.findOne({ id: 6 });
  res.status(200).json({ message: image.image });
}
