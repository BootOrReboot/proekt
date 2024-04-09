import connection from "../mongoDB";

export default async function insert(req, res) {
  const info = JSON.parse(req.body);
  const name = info.name;
  const surname = info.surname;
  const email = info.email;
  const password = info.password;
  const classNum = info.classNumber;

  const form = {};

  form.firstName = name;
  form.lastName = surname;
  form.email = email;
  form.password = password;
  form.classNum = classNum;
  form.isAdmin = false;
  form.seen = false;
  form.notifications = { N1: "Welcome" };
  form.isLogged = false;
  console.log(form);
  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const updating = await collections.insertOne(form);
  res.status(200).json({ message: email });
}
