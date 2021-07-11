import { env } from "../lib/config";
import { main } from "../lib/server";

main({ env }).catch((err) => {
  console.error(err);
  process.exit(1);
});
