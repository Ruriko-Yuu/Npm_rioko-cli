const environment = import.meta.env.MODE || "production";

const modules = import.meta.glob<{ default: any }>("./env/*.ts", {});

const map: Record<string, any> = {};
for (const key in modules) {
  const fileKey = key.replace(/\.\/env\/|\.ts$/g, "");
  map[fileKey] = await modules[key]()
}
const config = map[`${environment}`];

export default config.default;