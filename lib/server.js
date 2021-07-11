import { dirname } from "path";
import { fileURLToPath } from "url";

import { Server } from "@logux/server";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function main({ env }) {
  const supabase = createClient(env.supabaseApiUrl, env.supabaseApiKey);

  const server = new Server(
    Server.loadOptions(process, {
      subprotocol: "1.0.0",
      supports: "1.x",
      root: __dirname,
    })
  );

  server.auth(({ userId, token }) => {
    // Allow only local users until we will have a proper authentication
    return process.env.NODE_ENV === "development";
  });

  server.channel("presets/arsenal", {
    access(ctx) {
      return true;
    },
    async load(ctx) {
      let { data: items, error } = await supabase
        .from("arsenal_presets")
        .select("items");
      if (error) {
        return { type: "error/presets_arsenal", error };
      }

      return { type: "presets/arsenal/items", items };
    },
  });

  server.listen();
}
