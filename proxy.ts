  import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

  serve(async (req) => {
    const url = new URL(req.url);
    const target = "https://api.ropro.io" + url.pathname + url.search;
    const headers = new Headers(req.headers);
    headers.set("origin", "https://ropro.io");
    headers.set("referer", "https://ropro.io/");
    headers.set("user-agent", "RoPro");

    const response = await fetch(target, {
      method: req.method,
      headers,
      body: req.body,
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  });
