import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const targetUrl = `https://api.ropro.io${url.pathname}${url.search}`;

    const headers = new Headers(req.headers);
    // Overwrite headers needed for RoPro API to accept the request
    headers.set("origin", "https://ropro.io");
    headers.set("referer", "https://ropro.io/");
    headers.set("user-agent", "RoPro");

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
    });

    // Filter out some headers that cause CORS or other issues
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("transfer-encoding");
    responseHeaders.delete("connection");

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(`Error contacting RoPro API: ${error}`, { status: 502 });
  }
});
