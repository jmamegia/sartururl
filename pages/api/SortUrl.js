import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async (req, res) => {
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substr(2, 5);
  try {
    const shortUrlStored = await prisma.link.findUnique({
      where: {
        url,
      },
    });
    if (shortUrlStored) res.status(200).send(shortUrlStored);
    else {
      const data = await prisma.link.create({
        data: {
          url,
          shortUrl,
        },
      });
      res.status(200).send(data);
    }
  } catch {
    res.status(500).send({ error: "Db error" });
  }
};
