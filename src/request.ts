import {
  RequestArguments,
  RequestData,
  RequestHeaders,
  RequestMessage,
  RequestObject,
  RequestQuery,
  RequestResponse,
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
  const str: string[] = [];
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      str.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent((obj[key] as RequestObject[]).join(",")),
      );
    } else {
      str.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(obj[key] as RequestObject),
      );
    }
  });
  return "?" + str.join("&");
}

function tryJSON<T>(json: string): RequestMessage | RequestData<T> {
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

function response<T>(
  httpRequest: XMLHttpRequest,
  withData = false,
): RequestResponse<T> {
  return {
    status: httpRequest.status,
    headers: getAllResponseHeaders(httpRequest),
    ...(withData
      ? { data: tryJSON<T>(httpRequest.responseText) }
      : tryJSON<T>(httpRequest.responseText)),
  } as RequestResponse<T>;
}

export default function request<T>({
  method,
  url,
  body,
  query,
  headers,
}: RequestArguments): Promise<RequestResponse<T>> {
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
          resolve(response<T>(httpRequest, true));
        } else {
          reject(response<T>(httpRequest));
        }
      }
    };
  });
}
