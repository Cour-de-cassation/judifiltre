import React, { ReactElement } from "react";
import { decisionType, publicityInfoType } from "../../core";
import { apiCaller, useApi, DataFetcher } from "../../services/api";

export { DecisionDataFetcher };

type paramsType = Pick<publicityInfoType, "_id" | "sourceDb">;

function DecisionDataFetcher(props: {
  params: paramsType;
  children: (fetched: { decision: decisionType }) => ReactElement;
}) {
  const decisionFetchInfo = useApi(
    buildFetchDecision(),
    props.params,
    shouldRefetch
  );

  return (
    <DataFetcher
      buildComponentWithData={(decision: decisionType) =>
        props.children({ decision })
      }
      fetchInfo={decisionFetchInfo}
    />
  );

  function shouldRefetch(params1: paramsType, params2: paramsType) {
    return params1._id !== params2._id || params1.sourceDb !== params2.sourceDb;
  }

  function buildFetchDecision() {
    return async () => {
      const fetchInfo = await apiCaller.get("decision", props.params);
      return {
        data: fetchInfo.data as decisionType,
        statusCode: fetchInfo.statusCode,
      };
    };
  }
}
