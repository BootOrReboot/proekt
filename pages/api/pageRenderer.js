import connection from "./mongoDB";

export default async function insert(req, res) {
  const info = JSON.parse(req.body);
  const user = Number(info.num);

  const client = await connection();
  const base = client.db("baza");
  if (info.lang == "al") {
    const collections = base.collection("projectsAL");
    const finding = await collections.findOne({ id: user });

    res.status(200).json({ message: finding });
  } else {
    const collections = base.collection("projects");
    const finding = await collections.findOne({ id: user });

    res.status(200).json({ message: finding });
  }
}
