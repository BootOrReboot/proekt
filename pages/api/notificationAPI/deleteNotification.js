import connection from "../mongoDB";

export default async function insert(req, res) {
  const info = JSON.parse(req.body);
  const user = info.name;
  const id = Number(info.id.slice(1, 2));

  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const finding = await collections.findOne({ email: user });

  const filArr = Object.keys(finding.notifications).filter((el, index) => {
    return index + 1 != id;
  });
  const newArr = filArr.map((el, index) => {
    if (Number(el.slice(1, 2)) >= id) {
      return `N${index + 1}`;
    } else {
      return el;
    }
  });

  const newArrofText = Object.values(finding.notifications).filter(
    (el, index) => {
      return index != id - 1;
    }
  );
  let obj = {};
  newArr.map((el) => {
    obj[el] = el;
  });
  newArrofText.map((el, index) => {
    const key = Object.keys(obj)[index];
    obj[key] = el;
  });

  collections.updateOne({ username: user }, { $set: { notifications: obj } });
  console.log(obj);
  res.status(200).json({ message: "deleted" });
}
