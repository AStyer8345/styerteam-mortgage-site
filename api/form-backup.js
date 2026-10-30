const { handleFormPost } = require("./lib/form-post");

module.exports = async function formBackup(req, res) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const body = Buffer.concat(chunks).toString("utf8");
  const host = req.headers.host || "localhost";
  const response = await handleFormPost({
    method: req.method,
    headers: req.headers,
    body,
    url: `https://${host}${req.url || "/api/form-backup"}`,
  });
  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "content-type" || key.toLowerCase() === "location") res.setHeader(key, value);
  });
  res.send(Buffer.from(await response.arrayBuffer()));
};
