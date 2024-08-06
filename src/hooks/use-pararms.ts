import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type IMultiParams = {
  [key: string]: any;
};

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParams = (key: string, value: any) => {
    router.push(pathname + "?" + createQueryString(key, value));
  };

  //use this to set multiple params at once by passing a params object
  const setMultipleQueryParams = (paramsObject: IMultiParams) => {
    let params = new URLSearchParams(searchParams.toString());

    for (const key in paramsObject) {
      params.set(key, paramsObject[key]);
    }

    router.push(pathname + "?" + params.toString());
  };

  const clearQueryParams = () => {
    router.push(pathname);
  };

  return { setQueryParams, clearQueryParams, setMultipleQueryParams };
};

export default useQueryParams;
