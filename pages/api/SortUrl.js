import Link from "../../db/Link";

export default async (req, res) => {
  await Link.sync();
  console.log(req.rawHeaders[1]);
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substr(2, 5);
  try {
    const shortUrlStored = await Link.findOne({
      where: {
        url,
      },
    });
    if (shortUrlStored)
      res
        .status(200)
        .send({
          shortUrl: `https://${req.rawHeaders[1]}/${shortUrlStored.shortUrl}`,
        });
    else {
      const data = { url, shortUrl };
      await Link.create(data);

      res
        .status(200)
        .send({ shortUrl: `https://${req.rawHeaders[1]}/${shortUrl}` });
    }
  } catch {
    res.status(500).send({ error: "Db error" });
  }
};
