/* eslint-disable @typescript-eslint/no-explicit-any */
import headersMock from "./headers";

const requestMock = {
  getAllResponseHeaders: jest.fn(() => headersMock.text),
  open: jest.fn(),
  setRequestHeader: jest.fn(),
  send: jest.fn(() => {
    [1, 2, 3, 4].forEach((readyState) => {
      setTimeout(() => {
        requestMock.readyState = readyState;
        requestMock.onreadystatechange();
      }, readyState * 100);
    });
  }),
} as any;

(global.XMLHttpRequest as any) = jest.fn(() => requestMock);

jest.mock("xmlhttprequest", () => ({
  XMLHttpRequest: XMLHttpRequest,
}));

export default requestMock;
