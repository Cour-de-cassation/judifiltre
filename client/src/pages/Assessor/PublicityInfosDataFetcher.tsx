import React, { ReactElement } from "react";
import { publicityInfoType } from "judifiltre-core";
import { apiCaller, useApi, DataFetcher } from "../../services/api";

export { PublicityInfosDataFetcher };

function PublicityInfosDataFetcher(props: {
  children: (fetched: { publicityInfos: publicityInfoType[] }) => ReactElement;
}) {
  const publicityInfoFetchInfo = useApi(buildFetchPublicityInfos(), {});
  return (
    <DataFetcher
      buildComponentWithData={(publicityInfos: publicityInfoType[]) =>
        props.children({ publicityInfos })
      }
      fetchInfo={publicityInfoFetchInfo}
    />
  );
  function buildFetchPublicityInfos() {
    return async () => {
      const fetchInfo = await apiCaller.get("publicityInfos");
      return {
        data: fetchInfo.data as publicityInfoType[],
        statusCode: fetchInfo.statusCode,
      };
    };
  }
}
