import React, { ReactElement } from "react";
import { handleFetchedData } from "./handleFetchedData";

export { DataFetcher };

function DataFetcher<dataT>(props: {
  buildComponentWithData: (returnedData: dataT) => ReactElement;
  fetchInfo: { isLoaded: boolean; statusCode?: number; data?: dataT };
  showLoadingOnRefetch?: boolean;
}) {
  const fetchedData = handleFetchedData(
    props.fetchInfo,
    props.showLoadingOnRefetch
  );

  switch (fetchedData.kind) {
    case "loading":
      return buildLoadingPage();
    case "data":
      return props.buildComponentWithData(fetchedData.data);
    case "error":
      return buildErrorPage();
  }

  function buildErrorPage() {
    return <div>Error</div>;
  }

  function buildLoadingPage() {
    return <div>Loading...</div>;
  }
}
