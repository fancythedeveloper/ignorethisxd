import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const targetUrl = `https://api.ropro.io${url.pathname}${url.search}`;

  const headers = new Headers(req.headers);
  headers.set("origin", "https://ropro.io");
  headers.set("referer", "https://ropro.io/");
  headers.set("user-agent", "RoPro");

  try {
    const res = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
    });
    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  } catch {
    return new Response("Error contacting RoPro API", { status: 502 });
  }
});
