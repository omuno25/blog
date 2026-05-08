export async function httpFetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`HTTP request failed: ${response.status} (${url})`);
  }
  return (await response.json()) as T;
}
