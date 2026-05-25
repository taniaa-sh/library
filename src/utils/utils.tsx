import { AxiosMethodEnum } from "./type";

export const base64ToBlob = (base64: string, contentType: string = 'application/pdf'): Blob => {
  const cleanedBase64 = base64.replace(/\s/g, '');
  const byteCharacters = atob(cleanedBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

type FetchDataProps<T> = {
  baseUrl: string;
  apiRoute: string;
  token?: string;
  method?: AxiosMethodEnum;
  queryParams?: T | FormData;
  signal?: AbortSignal;
  isFormData?: boolean;
};

export const fetchData = async <TRequest = unknown, TResponse = unknown>({
  baseUrl,
  apiRoute,
  token,
  method = AxiosMethodEnum.get,
  queryParams,
  signal,
  isFormData = false,
}: FetchDataProps<TRequest>): Promise<TResponse> => {
  let url = "";

  if (method === AxiosMethodEnum.get) {
    const params = new URLSearchParams();

    if (
      queryParams &&
      typeof queryParams === "object" &&
      !(queryParams instanceof FormData)
    ) {
      Object.entries(queryParams as Record<string, unknown>).forEach(
        ([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        }
      );
    }

    url = `${baseUrl}${apiRoute}?${params.toString()}`;
  } else {
    url = `${baseUrl}${apiRoute}`;
  }

  const options: RequestInit = {
    method,
    signal,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };

  if (method !== AxiosMethodEnum.get) {
    if (isFormData) {
      options.body = queryParams as FormData;
    } else {
      options.body = JSON.stringify(queryParams);
    }
  }

  const response = await fetch(url, options);

  const data: TResponse = await response.json();

  if (!response.ok) {
    const errorData = data as {
      error?: string;
      message?: string;
    };

    throw new Error(
      errorData.error || errorData.message || "Request failed"
    );
  }

  return data;
};
