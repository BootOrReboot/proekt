import connection from "../mongoDB";

export default async function insert(req, res) {
  const info = JSON.parse(req.body);
  const name = info.name;
  const surname = info.surname;
  const email = info.email;
  const password = info.password;
  const classNum = info.classNumber;
  const funct = info.function;

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

  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const user = await collections.findOne({ email: email });

  if (funct === "register") {
    if (user === null) {
      await collections.insertOne(form);
      res.status(200).json({ message: email });
    } else {
      res.status(500).json({ message: "Email Already Exists" });
    }
    console.log(funct);
  } else {
    const clarification = await collections.findOne({
      email: email,
      password: password,
    });
    if (clarification !== null) {
      res.status(200).json({ message: email });
    } else {
      res.status(500).json({ message: "Email Or Password is Incorrect" });
    }
  }
}
