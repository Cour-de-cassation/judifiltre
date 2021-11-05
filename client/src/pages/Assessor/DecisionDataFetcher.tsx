import React, { ReactElement } from "react";
import { idModule, publicityInfoType } from "judifiltre-core";
import { apiCaller, useApi, DataFetcher } from "../../services/api";

export { DecisionDataFetcher };

type paramsType = { publicityInfoId: publicityInfoType["_id"] };

function DecisionDataFetcher(props: {
  params: paramsType;
  children: (fetched: { decision: string }) => ReactElement;
}) {
  const decisionFetchInfo = useApi(
    buildFetchDecision(),
    props.params,
    shouldRefetch
  );

  return (
    <DataFetcher
      buildComponentWithData={(decision: string) =>
        props.children({ decision })
      }
      fetchInfo={decisionFetchInfo}
    />
  );

  function shouldRefetch(params1: paramsType, params2: paramsType) {
    return !idModule.lib.equalId(
      params1.publicityInfoId,
      params2.publicityInfoId
    );
  }

  function buildFetchDecision() {
    return async () => {
      const fetchInfo = await apiCaller.get("decision", {
        publicityInfoId: idModule.lib.convertToString(
          props.params.publicityInfoId
        ),
      });
      return {
        data: fetchInfo.data as string,
        statusCode: fetchInfo.statusCode,
      };
    };
  }
}
