import React, { ReactElement } from "react";
import { idModule, publicityInfoType } from "judifiltre-core";
import { apiCaller, useApi, DataFetcher } from "../../services/api";

export { PublicityInfosDataFetcher };

function PublicityInfosDataFetcher(props: {
  children: (fetched: { publicityInfos: publicityInfoType[]; refetch: () => void }) => ReactElement;
}) {
  const publicityInfoFetchInfo = useApi(buildFetchPublicityInfos(), {});

  return (
    <DataFetcher
      buildComponentWithData={(publicityInfos: publicityInfoType[]) =>
          props.children({
            publicityInfos,
            refetch: publicityInfoFetchInfo.refetch
          })
      }
      fetchInfo={publicityInfoFetchInfo}
    />
  );
  function buildFetchPublicityInfos() {
    return async () => {
      const fetchInfo = await apiCaller.get("publicityInfos");
      return {
        data: (fetchInfo.data as publicityInfoType[]).map((publicityInfo) => ({
          ...publicityInfo,
          _id: idModule.lib.buildId(publicityInfo._id),
        })),
        statusCode: fetchInfo.statusCode,
      };
    };
  }
}
