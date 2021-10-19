export { handleFetchedData };

type dataFetchStatus<dataT> =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "data"; data: dataT };

function handleFetchedData<dataT>(
  fetchInfo: { isLoaded: boolean; statusCode?: number; data?: dataT },
  showLoadingOnRefetch?: boolean
): dataFetchStatus<dataT> {
  if (!fetchInfo.isLoaded && (showLoadingOnRefetch || !fetchInfo.data)) {
    return { kind: "loading" };
  }

  if (fetchInfo.statusCode) {
    if (
      (fetchInfo.statusCode === 200 || fetchInfo.statusCode === 201) &&
      fetchInfo.data
    ) {
      return { kind: "data", data: fetchInfo.data };
    } else {
      return { kind: "error" };
    }
  }

  if (fetchInfo.data) {
    return { kind: "data", data: fetchInfo.data };
  }

  return { kind: "error" };
}
