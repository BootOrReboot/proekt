import connection from "./mongoDB";

export default async function sending(req, res) {
  const info = JSON.parse(req.body);

  const title = info.name;
  const disc = info.disc;
  const day = Number(info.date.day);
  const month = info.date.month;
  const fullMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = Number(info.date.year);
  const client = await connection();
  const base = client.db("baza");
  if (info.lang === "mk") {
    const collections = base.collection("projects");
    const allDocs = await collections.find({}).toArray();
    const ids = allDocs.map((el) => {
      return el.id;
    });
    const latestNews = Math.max(...ids);

    if (info.currentChunk === 1) {
      const form = {};
      form.name = title;
      form.disc = disc;
      form.id = latestNews + 1;
      form.image = info.chunk;
      form.day = day;
      form.month = fullMonth;
      form.year = year;
      collections.insertOne(form);
    }
    console.log(new Blob([info.chunk]).size);
    res.status(200).json({ data: "working" });
  } else {
    const collections = base.collection("projectsAL");
    const allDocs = await collections.find({}).toArray();
    const ids = allDocs.map((el) => {
      return el.id;
    });
    const latestNews = Math.max(...ids);

    if (info.currentChunk === 1) {
      const form = {};
      form.name = title;
      form.disc = disc;
      form.id = latestNews + 1;
      form.image = info.chunk;
      form.day = day;
      form.month = fullMonth;
      form.year = year;
      collections.insertOne(form);
    }
    console.log(new Blob([info.chunk]).size);
    res.status(200).json({ data: "working" });
  }
}
