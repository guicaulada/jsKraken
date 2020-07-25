export type RequestObject = boolean | string | number;

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestQuery {
  [key: string]: RequestObject | RequestObject[] | undefined;
}

export interface RequestBody {
  [key: string]:
    | RequestObject
    | RequestObject[]
    | RequestBody
    | RequestBody[]
    | undefined;
}

export interface RequestHeaders {
  [key: string]: string;
}

export interface RequestArguments {
  method: RequestMethod;
  url: string;
  query?: unknown;
  body?: unknown;
  headers?: RequestHeaders;
}

export interface RequestMessage {
  message?: string;
}

export interface RequestData<T> {
  data?: T;
}

export interface RequestResponse<T = undefined>
  extends RequestMessage,
    RequestData<T> {
  headers: RequestHeaders;
  status: number;
  error?: string;
}
