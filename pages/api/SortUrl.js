import Link from "../../db/Link";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  //res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const api = async (req, res) => {
  await Link.sync();
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substr(2, 5);
  try {
    const shortUrlStored = await Link.findOne({
      where: {
        url,
      },
    });
    if (shortUrlStored)
      res.status(200).send({
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

export default allowCors(api);
