import connection from "../mongoDB";

export default async function insert(req, res) {
  const user = JSON.parse(req.body);
  const num = user.classNum;
  const disc = user.disc;
  const client = await connection();
  const base = client.db("baza");
  const collections = base.collection("Professors");
  const arrUsers = await collections.find({ classNum: num }).toArray();
  const numNotif = arrUsers.map((el) => {
    return el.notifications;
  });
  const keys = Object.keys(numNotif[0]);
  const numbers = keys.map((el) => {
    return Number(el.slice(1, 2));
  });
  const maxNum = Math.max(...numbers);
  const newNotificationKey = `N${maxNum + 1}`;

  const newPromises = arrUsers.map((el) => {
    const newUsers = { ...el.notifications, [newNotificationKey]: disc };
    return collections.updateMany(
      { classNum: num },
      { $set: { notifications: newUsers } }
    );
  });

  await Promise.all(newPromises);

  res.status(200).json({ message: "works" });
}
