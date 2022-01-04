import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
import { DecisionPublicityButton } from "./DecisionPublicityButton";

export { DecisionViewer };

function DecisionViewer(props: {
  publicityInfoId: publicityInfoType["_id"];
  refetchPublicityInfos: () => void;
}) {
  return (
    <DecisionDataFetcher params={{ publicityInfoId: props.publicityInfoId }}>
      {({ decision }) => (
        <div>
          {decision}
          <div>
            <DecisionPublicityButton
              publicityInfoId={props.publicityInfoId}
              publicityAssessment="public"
              refetchPublicityInfos={props.refetchPublicityInfos}
            />
            <DecisionPublicityButton
              publicityInfoId={props.publicityInfoId}
              publicityAssessment="notPublic"
              refetchPublicityInfos={props.refetchPublicityInfos}
            />
            <DecisionPublicityButton
              publicityInfoId={props.publicityInfoId}
              publicityAssessment="partiallyPublic"
              refetchPublicityInfos={props.refetchPublicityInfos}
            />
          </div>
        </div>
      )}
    </DecisionDataFetcher>
  );
}
