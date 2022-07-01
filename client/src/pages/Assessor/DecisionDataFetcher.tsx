import React, { ReactElement } from "react";
import { idModule, publicityInfoType } from "judifiltre-core";
import { apiCaller, useApi, DataFetcher } from "../../services/api";

export { DecisionDataFetcher };

type paramsType = { publicityInfoId: publicityInfoType["_id"] | undefined };

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
    return (
      !!params1?.publicityInfoId &&
      !!params2?.publicityInfoId &&
      !idModule.lib.equalId(params1.publicityInfoId, params2.publicityInfoId)
    );
  }

  function buildFetchDecision() {
    return async () => {
      const fetchInfo =
        props.params.publicityInfoId &&
        (await apiCaller.get("decision", {
          publicityInfoId: idModule.lib.convertToString(
            props.params.publicityInfoId
          ),
        }));
      return {
        data: fetchInfo?.data as string,
        statusCode: fetchInfo?.statusCode ?? 404,
      };
    };
  }
}
