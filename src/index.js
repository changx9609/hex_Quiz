export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '') || 'quiz_data.json';

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    };

    try {
      const object = await env.MY_BUCKET.get(path);
      
      if (object === null) {
        return new Response(JSON.stringify({ error: `File "${path}" not found in R2 bucket` }), { status: 404, headers });
      }

      return new Response(object.body, { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }
};