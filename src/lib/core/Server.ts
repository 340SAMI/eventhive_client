import { getUserToken } from "./Session";

const baseUrl =process.env.NEXT_PUBLIC_BASE_URL;




export const authHeader = async (): Promise<Record<string, string>> => {
    const token = await getUserToken();
 
        if (!token) {
            return {};
        }

        return {
            authorization: `Bearer ${token}`,
        };    
}


export const ProtectedMutation = async (
  path: string,
  data: unknown,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST"
): Promise<Record<string, unknown>> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers : {
      "Content-Type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(data),
  });
 
  const json = await res.json();
 
  if (!res.ok) {
    throw new Error(json?.message || "Request failed");
  }
 
  return json;
};


export const publicFetch = async (path: string) => {
    const res = await fetch(`${baseUrl}${path}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.status}`);
    }

    return res.json();
};



export const protectedFetch = async (path:string) => {
    const res = await fetch(`${baseUrl}${path}`,
        {
            headers: await authHeader()
        }
    );

    if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
    
    }

    return res.json();
}