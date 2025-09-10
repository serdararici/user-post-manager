export const API_URL = "https://jsonplaceholder.typicode.com";

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

// Generic service factory
const apiService = <T>(resource: string) => ({
  getAll: (): Promise<T[]> => request<T[]>(`/${resource}`),

  getOne: (id: number): Promise<T> => request<T>(`/${resource}/${id}`),

  create: (data: T): Promise<T> =>
    request<T>(`/${resource}`, { method: "POST", body: JSON.stringify(data) }),

  update: (id: number, data: T): Promise<T> =>
    request<T>(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  
  delete: (id: number): Promise<void> =>
    request<void>(`/${resource}/${id}`, { method: "DELETE" }),
});

export default apiService;
