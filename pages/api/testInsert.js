import connection from "./mongoDB";

export default async function insert(req, res) {
  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  collections.updateMany({}, { $set: { seen: false } });
  res.status(200).json({ message: "works" });
}
