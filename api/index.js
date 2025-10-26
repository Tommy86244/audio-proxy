export default async function handler(req) {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname.startsWith('/downloads/')) {
    const target = `https://coze-js-api.devtool.uk${pathname}`;
    const resp = await fetch(target);
    return new Response(resp.body, {
      headers: {
        'Content-Type': resp.headers.get('Content-Type') || 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
      },
      status: resp.status,
    });
  }

  const u = searchParams.get('u');
  if (u) {
    const resp = await fetch(u);
    return new Response(resp.body, {
      headers: {
        'Content-Type': resp.headers.get('Content-Type') || 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
      },
      status: resp.status,
    });
  }

  return new Response("Missing 'u' parameter or /downloads path", { status: 400 });
}
