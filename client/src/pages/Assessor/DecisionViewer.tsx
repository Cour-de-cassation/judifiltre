import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";

export { DecisionViewer };

function DecisionViewer(props: { publicityInfoId: publicityInfoType["_id"] }) {
  return (
    <DecisionDataFetcher params={{ publicityInfoId: props.publicityInfoId }}>
      {({ decision }) => <div>{decision}</div>}
    </DecisionDataFetcher>
  );
}
