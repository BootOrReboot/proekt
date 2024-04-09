import connection from "../mongoDB";

export default async function insert(req, res) {
  const user = req.body;

  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const updating = await collections.updateOne(
    { id: user },
    { $set: { seen: true } }
  );
  res.status(200).json({ message: "works" });
}
