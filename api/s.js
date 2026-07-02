import { list } from "@vercel/blob";

export default async function handler(req, res) {
  const id = String(req.query.id || "");
  if (!/^[a-f0-9]{8}$/.test(id)) return res.status(400).send("Neplatný odkaz.");

  const cesta = `s/${id}.json`;
  const { blobs } = await list({ prefix: cesta, limit: 1 });
  const blob = blobs.find((b) => b.pathname === cesta);
  if (!blob) return res.status(404).send("Widget nenalezen.");

  const data = await (await fetch(blob.url)).json();
  if (typeof data?.url !== "string") return res.status(404).send("Widget nenalezen.");

  /* mapování je neměnné (id = hash URL), redirect se může tvrdě cachovat */
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=31536000");
  return res.redirect(302, data.url);
}
