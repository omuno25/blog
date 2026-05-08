// Generic cache+coalescing helper used by adapters.
export class RequestCache {
  private readonly cache = new Map<string, { value: unknown; expiresAt: number }>();
  private readonly pending = new Map<string, Promise<unknown>>();

  constructor(private readonly ttlMs: number) {}

  async remember<T>(key: string, loader: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const hit = this.cache.get(key) as { value: T; expiresAt: number } | undefined;
    if (hit && hit.expiresAt > now) return hit.value;

    const inFlight = this.pending.get(key) as Promise<T> | undefined;
    if (inFlight) return inFlight;

    const task = loader()
      .then((value) => {
        this.cache.set(key, { value, expiresAt: Date.now() + this.ttlMs });
        return value;
      })
      .finally(() => this.pending.delete(key));

    this.pending.set(key, task);
    return task;
  }
}
