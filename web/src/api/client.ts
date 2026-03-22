const BASE_URL = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError(0, "API non configuree : VITE_API_URL manquant.");
  }

  const url = `${BASE_URL}${path}`;
  const headers: HeadersInit = { ...options?.headers };

  if (options?.body) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  let res: Response;
  try {
    res = await fetch(url, { ...options, headers });
  } catch {
    throw new ApiError(0, "Impossible de joindre le serveur. Verifiez votre connexion.");
  }

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || body.message || detail;
    } catch {
      // response body is not JSON
    }
    throw new ApiError(res.status, detail);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
