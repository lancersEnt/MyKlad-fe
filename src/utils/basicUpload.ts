export default async function basicUpload(params: any): Promise<any> {
  const baseUrl = 'https://api.bytescale.com';
  const path = `/v2/accounts/${params.accountId}/uploads/binary`;

  const entries = (obj: Record<string, any>) =>
    Object.entries(obj).filter(([, val]) => val !== null && val !== undefined);

  const query = entries(params.querystring ?? {})
    .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
    .map((kv) => kv.join('='))
    .join('&');

  const response = await fetch(
    `${baseUrl}${path}${query.length > 0 ? '?' : ''}${query}`,
    {
      method: 'POST',
      body: params.requestBody,
      headers: Object.fromEntries(
        entries({
          Authorization: `Bearer ${params.apiKey}`,
          'X-Upload-Metadata': JSON.stringify(params.metadata),
        })
      ),
    }
  );

  const result = await response.json();

  if (Math.floor(response.status / 100) !== 2) {
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  }

  return result;
}
