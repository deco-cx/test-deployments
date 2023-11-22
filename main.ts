/// <reference no-default-lib="true"/>
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2020.intl" />

import { renderExample } from "./preact_rts.tsx";


const handleNoop = async (request: Request) => {
  const queryParams = new URL(request.url).searchParams;
  const N = parseInt(queryParams.get("N") || "5", 10);

  await new Promise((resolve) => setTimeout(resolve, N * 1000));
  return { status: "ok" };
};

const handleCpu = (request: Request) => {
  const queryParams = new URL(request.url).searchParams;
  const N = parseInt(queryParams.get("N") || "5", 10);
  const C = parseInt(queryParams.get("C") || "5", 10);
  const O = parseInt(queryParams.get("O") || "1", 10);
  if (O) {
    return { status: "ok", body:  renderExample(N, C) };
  }
  renderExample(N, C);
  return { status: "ok" };
};

const handleData = async (request: Request) => {
    const queryParams = new URL(request.url).searchParams;
    const addresses: string[] = [];

    for (let i = 1; i <= 10; i++) {
        const addressParam = queryParams.get(`address${i}`);
        if (addressParam) {
            addresses.push(addressParam);
        }
    }

    const fetchPromises = addresses.map((address) => fetch(address));

    const results = (await Promise.all(fetchPromises)).map((response) => response.status);
    
    const statusCounts = results.reduce((counts, status) => {
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {} as Record<number, number>);

    return statusCounts;
};

const router = (request: Request) => {
  const url = new URL(request.url);

  switch (url.pathname) {
    case "/noop":
      return handleNoop(request);
    case "/cpu":
      return handleCpu(request);
    case "/data":
      return handleData(request);
    default:
      return { status: "not found" };
  }
};

console.log("Server is running on http://localhost:8000");

const handler = async (request: Request): Promise<Response> =>  {
    const result = await router(request);
    return new Response(JSON.stringify(result), { headers: new Headers({ "Content-Type": "application/json" }) });
}

Deno.serve({ port: 8000 }, handler);
