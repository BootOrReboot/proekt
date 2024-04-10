import connection from "../mongoDB";

export default async function insert(req, res) {
  const user = req.body;

  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const finding = await collections.findOne({ email: user });
  console.log(finding.seen);
  res.status(200).json({ message: finding });
}
