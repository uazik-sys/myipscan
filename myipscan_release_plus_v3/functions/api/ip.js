export async function onRequest(context) {
  const request = context.request;
  const cf = request.cf || {};
  const headers = request.headers;
  const ip = headers.get("CF-Connecting-IP") || headers.get("X-Forwarded-For") || "";
  const ua = headers.get("User-Agent") || "";
  const payload = {
    ip,
    ipv6: ip.includes(":"),
    country: cf.country || null,
    city: cf.city || null,
    region: cf.region || cf.regionCode || null,
    latitude: cf.latitude ? Number(cf.latitude) : null,
    longitude: cf.longitude ? Number(cf.longitude) : null,
    timezone: cf.timezone || null,
    asn: cf.asn || null,
    colo: cf.colo || null,
    ua
  };
  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });
}