import connection from "./mongoDB";

export default async function insert(req, res) {
  const client = await connection();
  const base = client.db("baza");
  const collections = await base.listCollections().toArray();
  res.status(200).json({ message: collections });
}
