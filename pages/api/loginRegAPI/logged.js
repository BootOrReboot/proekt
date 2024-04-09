import connection from "../mongoDB";

export default async function insert(req, res) {
  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const info = JSON.parse(req.body);
  const result = await collections.findOne(info);

  if (result != null) {
    coll.updateOne({ _id: result._id }, { $set: { isLogged: true } });

    res.status(200).json({ message: info.email });
  } else {
    res.status(404).json({ error: "doesnt work" });
  }
}
