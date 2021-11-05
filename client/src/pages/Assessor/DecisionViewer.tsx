import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";

export { DecisionViewer };

function DecisionViewer(props: {
  decisionParams: Pick<publicityInfoType, "_id" | "sourceDb">;
}) {
  return (
    <DecisionDataFetcher params={props.decisionParams}>
      {({ decision }) => <div>{decision.text}</div>}
    </DecisionDataFetcher>
  );
}
