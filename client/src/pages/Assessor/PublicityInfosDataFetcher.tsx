import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { idModule, publicityInfoType } from "judifiltre-core";
import { apiCaller, useApi, DataFetcher } from "../../services/api";

export { PublicityInfosDataFetcher };

type assessorParamsType = {
  publicityInfoId?: string;
};

function PublicityInfosDataFetcher(props: {
  children: (fetched: { publicityInfos: publicityInfoType[]; refetch: () => void; selectedPublicityInfoId: publicityInfoType['_id'] }) => ReactElement;
}) {
  const publicityInfoFetchInfo = useApi(buildFetchPublicityInfos(), {});
  const params = useParams<assessorParamsType>();
  const styles = buildStyles();

  return (
    <DataFetcher
      buildComponentWithData={(publicityInfos: publicityInfoType[]) =>
          props.children({
            publicityInfos,
            refetch: publicityInfoFetchInfo.refetch,
            selectedPublicityInfoId: publicityInfos[0] && publicityInfos[0]._id
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
  function buildStyles() {
    return {
      container: {
        display: "flex",
        fontFamily: "sans-serif",
      },
    };
  }
}
