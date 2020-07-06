import {
  RequestHeaders,
  RequestMessage,
  RequestObject,
  RequestOptions,
  RequestQuery,
} from "./types/request";

function newRequest(): XMLHttpRequest {
  if (process.env.APP_ENV === "browser") {
    return new XMLHttpRequest();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { XMLHttpRequest } = require("xmlhttprequest");
    return new XMLHttpRequest();
  }
}

function serialize(obj?: RequestQuery): string {
  if (!obj) return "";
  const str = [];
  for (const p in obj) {
    if (Array.isArray(obj[p])) {
      (obj[p] as RequestObject[]).forEach((e) => {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(e));
      });
    } else {
      str.push(
        encodeURIComponent(p) +
          "=" +
          encodeURIComponent(obj[p] as RequestObject),
      );
    }
  }
  return "?" + str.join("&");
}

function tryJSON<T>(json: string): RequestMessage | T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return { message: json };
  }
}

function getAllResponseHeaders(httpRequest: XMLHttpRequest): RequestHeaders {
  const allHeaders = {} as RequestHeaders;
  const headers = httpRequest.getAllResponseHeaders();
  const lines = headers.trim().split(/[\r\n]+/);
  lines.forEach((line) => {
    const parts = line.split(": ");
    const header = parts.shift();
    const value = parts.join(": ");
    if (header && value) {
      allHeaders[header] = value;
    }
  });
  return allHeaders;
}

function response<T>(httpRequest: XMLHttpRequest): T {
  return {
    status: httpRequest.status,
    headers: getAllResponseHeaders(httpRequest),
    ...tryJSON<T>(httpRequest.responseText),
  } as T;
}

export default function request<T>({
  method,
  url,
  body,
  query,
  headers,
}: RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    const httpRequest = newRequest();
    httpRequest.open(method, url + serialize(query as RequestQuery), true);
    for (const h in headers) {
      httpRequest.setRequestHeader(h, headers[h]);
    }
    httpRequest.send(JSON.stringify(body));
    httpRequest.onreadystatechange = (): void => {
      if (httpRequest.readyState == 4) {
        if (Number(httpRequest.status.toString()[0]) == 2) {
          resolve(response(httpRequest));
        } else {
          reject(response(httpRequest));
        }
      }
    };
  });
}
