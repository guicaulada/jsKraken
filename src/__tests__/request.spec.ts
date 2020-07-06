import request from "../request";
import headersMock from "../__mocks__/headers";
import requestMock from "../__mocks__/request";

describe("request", () => {
  it("Calls request function in node environment with all parameters and returns successful request", async () => {
    process.env.APP_ENV = "node";
    requestMock.status = 200;
    requestMock.responseText = '{ "data": [] }';
    const result = await request({
      method: "GET",
      url: "url",
      body: { data: [] },
      query: { query: "xyz", array: [1, 2] },
      headers: { header: "value" },
    });
    expect(requestMock.open).toBeCalledWith(
      "GET",
      "url?query=xyz&array=1&array=2",
      true,
    );
    expect(requestMock.setRequestHeader).toBeCalledWith("header", "value");
    expect(requestMock.send).toBeCalledWith('{"data":[]}');
    expect(result).toEqual({
      data: [],
      headers: headersMock.object,
      status: 200,
    });
  });

  it("Calls request function in node environment with all parameters and returns failed request", async () => {
    process.env.APP_ENV = "node";
    requestMock.status = 500;
    requestMock.responseText = "Internal error";
    try {
      await request({
        method: "GET",
        url: "url",
      });
    } catch (result) {
      expect(result).toEqual({
        message: "Internal error",
        headers: headersMock.object,
        status: 500,
      });
    }
  });

  it("Calls request function in node environment with only required parameters and returns successful request", async () => {
    process.env.APP_ENV = "node";
    requestMock.status = 200;
    requestMock.responseText = '{ "data": [] }';
    const result = await request({
      method: "GET",
      url: "url",
    });
    expect(result).toEqual({
      data: [],
      headers: headersMock.object,
      status: 200,
    });
  });

  it("Calls request function in a browser environment with only required parameters and returns successful request", async () => {
    process.env.APP_ENV = "browser";
    requestMock.status = 200;
    requestMock.responseText = '{ "data": [] }';
    const result = await request({
      method: "GET",
      url: "url",
    });
    expect(result).toEqual({
      data: [],
      headers: headersMock.object,
      status: 200,
    });
  });
});
