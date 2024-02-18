import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { IAppContext, useAppContext } from "@starwars-app/context/appContext";
interface ApiResponse {
  [key: string]: any;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
const BASE_URL = "https://swapi.dev/api";

export function doApiCall<T>(
  method: HttpMethod,
  uri: string,
  onSuccess: (data: T) => void,
  onFailure: ((error: any, err?: any) => void) | false = false,
  data?: any
): void {
  axios({
    method,
    url: `${BASE_URL}${uri}`,
    data,
  })
    .then((res: AxiosResponse<T>) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      console.error(err);
      if (onFailure === false) {
        return;
      }
      onFailure(err?.response?.data?.error, err);
    });
}

export function useApi<T>(
  method: HttpMethod,
  uri: string,
  postData?: any,
  deps: any[] = []
): [T | false, boolean, any, (apiPostData?: any) => void] {
  const [data, setData] = useState<T | false>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);

  const { paginationNumber }: IAppContext = useAppContext();

  const apiCallCallback = useCallback(
    (apiPostData?: any) => {
      setLoading(true);
      doApiCall<T>(
        method,
        uri,
        (responseData: T) => {
          setData(responseData);
          setError(false);
          setLoading(false);
        },
        (errorMessage: any) => {
          setError(errorMessage);
          setData(false);
          setLoading(false);
        },
        apiPostData
      );
    },
    [method, uri]
  );

  useEffect(() => {
    apiCallCallback(postData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCallCallback, JSON.stringify(postData), paginationNumber, ...deps]);

  return [data, loading, error, apiCallCallback];
}
