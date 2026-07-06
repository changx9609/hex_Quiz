export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // ─── GET /questions — return questions WITHOUT answers/explanation ───
    if (request.method === "GET" && path === "/questions") {
      try {
        const object = await env.MY_BUCKET.get("quiz_data.json");
        if (!object) {
          return new Response(JSON.stringify({ error: "quiz_data.json not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const data = JSON.parse(await object.text());
        // Deep clone and strip answer + explanation from every question
        const publicData = JSON.parse(JSON.stringify(data));
        for (const dim of publicData.dimensions) {
          for (const q of dim.questions) {
            delete q.answer;
            delete q.explanation;
          }
        }

        return new Response(JSON.stringify(publicData), {
          headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ─── GET /interpretations — serve dimension_interpretations.json ───
    if (request.method === "GET" && path === "/interpretations") {
      try {
        const object = await env.MY_BUCKET.get("dimension_interpretations.json");
        if (!object) {
          return new Response(JSON.stringify({ error: "dimension_interpretations.json not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        return new Response(object.body, {
          headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ─── POST /validate — server-side answer checking ───
    if (request.method === "POST" && path === "/validate") {
      try {
        const body = await request.json();
        const { questionId, userAnswer } = body;
        if (!questionId || userAnswer === undefined) {
          return new Response(JSON.stringify({ error: "Missing questionId or userAnswer" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const object = await env.MY_BUCKET.get("quiz_data.json");
        if (!object) {
          return new Response(JSON.stringify({ error: "quiz_data.json not found" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const data = JSON.parse(await object.text());

        // Find the question by id across all dimensions
        for (const dim of data.dimensions) {
          for (const q of dim.questions) {
            if (q.id === questionId) {
              const isChaos = q.answer === -1 || dim.name === "CHAOS";
              const isCorrect = isChaos ? true : (userAnswer === q.options[q.answer]);
              return new Response(JSON.stringify({
                correct: isCorrect,
                isChaos: isChaos,
                correctAnswer: isChaos ? userAnswer : q.options[q.answer],
                explanation: q.explanation
              }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
              });
            }
          }
        }

        return new Response(JSON.stringify({ error: `Question "${questionId}" not found` }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Everything else → 404
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
};