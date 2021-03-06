import { localStorage } from "../localStorage";

export { apiCaller };

const DEFAULT_HEADER = {
  "Content-Type": "application/json",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
};

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:8080/judifiltre/api/";

type paramType = string | number;

type paramsType = Record<string, paramType>;

const apiCaller = {
  async get<responseT>(
    routeName: string,
    params?: paramsType
  ): Promise<{
    data: responseT;
    statusCode: number;
  }> {
    const bearerToken = localStorage.bearerTokenHandler.get();

    const response = await fetch(
      buildUrlWithParams(API_URL + routeName, params),
      {
        cache: "default",
        headers: bearerToken
          ? { ...DEFAULT_HEADER, authorization: `Bearer ${bearerToken}` }
          : DEFAULT_HEADER,
        method: "get",
        mode: "cors",
      }
    );

    const data = await computeDataFromResponse(response);

    return {
      data,
      statusCode: response.status,
    };
  },

  async put<responseT>(
    routeName: string,
    body?: string,
    params?: paramsType
  ): Promise<{
    data: responseT;
    statusCode: number;
  }> {
    const bearerToken = localStorage.bearerTokenHandler.get();

    const response = await fetch(
      buildUrlWithParams(API_URL + routeName, params),
      {
        cache: "default",
        headers: bearerToken
          ? { ...DEFAULT_HEADER, authorization: `Bearer ${bearerToken}` }
          : DEFAULT_HEADER,
        method: "put",
        mode: "cors",
        body,
      }
    );

    const data = await computeDataFromResponse(response);

    return {
      data,
      statusCode: response.status,
    };
  },
};

function buildUrlWithParams(
  url: string,
  params?: Record<string, string | number>
) {
  const urlParameters = new URLSearchParams();

  if (params) {
    Object.entries(params).map(([key, value]) =>
      urlParameters.append(key, value.toString())
    );
    return `${url}?${urlParameters.toString()}`;
  } else {
    return url;
  }
}

async function computeDataFromResponse(response: Response): Promise<any> {
  if (response.status !== 200 && response.status !== 201) {
    console.warn(response);
    throw new Error("Error");
  }
  try {
    const textData = await response.text();
    try {
      const data: any = JSON.parse(textData);
      return data;
    } catch (_) {
      return textData;
    }
  } catch (error) {
    console.warn(error);
    throw new Error("Error");
  }
}
