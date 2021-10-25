import Link from "../db/Link";

export default function ShortId() {
  return <div>Short redirect</div>;
}

export async function getServerSideProps({ params }) {
  const { shortId } = params;

  const data = await Link.findOne({
    where: {
      shortUrl: shortId,
    },
  });
  if (!data) {
    return { redirect: { destination: "/" } };
  } else {
    return { redirect: { destination: data.url } };
  }
}
