import Link from "../../db/Link";

export default async (req, res) => {
  await Link.sync();
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substr(2, 5);
  try {
    const shortUrlStored = await Link.findOne({
      where: {
        url,
      },
    });
    if (shortUrlStored) res.status(200).send(shortUrlStored);
    else {
      const data = { url, shortUrl };
      await Link.create(data);

      res.status(200).send(data);
    }
  } catch {
    res.status(500).send({ error: "Db error" });
  }
};
