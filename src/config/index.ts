const environment = process.env.NODE_ENV || "prod";

const ctx = require.context("./env", false, /.ts$/);
const map: { [key: string]: { [key: string]: string } } = {};
for (const key of ctx.keys()) {
  const fileKey = key.replace(/\.\/|\.js/g, "");
  map[fileKey] = ctx(key).default;
}
const config = map[`${environment}.ts`];

export default config;
