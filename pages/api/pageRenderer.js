import connection from "./mongoDB";

export default async function insert(req, res) {
  const user = Number(req.body);

  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("projects");
  const finding = await collections.findOne({ id: user });

  res.status(200).json({ message: finding });
}
