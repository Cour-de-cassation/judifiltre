import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
import { ButtonWithIcon } from "pelta-design-system";
import { wordings } from "../../wordings";
import { apiCaller } from "../../services/api";
import { DecisionPublicityButton } from "./DecisionPublicityButton";

export { DecisionViewer };

function DecisionViewer(props: { publicityInfoId: publicityInfoType["_id"] }) {
  return (
    <DecisionDataFetcher params={{ publicityInfoId: props.publicityInfoId }}>
      {({ decision }) => (
        <div>
          {decision}
          <div>
          {[
            {
              color: "alert",
              text:wordings.assessor.decisionViewer.buttons.notPublic,
              iconName:"lock",
              publicityAssessment: "notPublic"
            },
            {
              color: "warning",
              text:wordings.assessor.decisionViewer.buttons.partiallyPublic,
              iconName:"puzzle",
              publicityAssessment: "partiallyPublic"
            },
            {
              color: "success",
              text:wordings.assessor.decisionViewer.buttons.public,
              iconName:"web",
              publicityAssessment: "public"
            }
          ].map(buttonData => (
            <DecisionPublicityButton 
              {...buttonData}
              publicityInfoId = {props.publicityInfoId}
              key = {buttonData.publicityAssessment}
            />
          ))}
          </div>
        </div>
      )}
    </DecisionDataFetcher>
  );
  function updatePublicityInfos(publicityAssessment: string) {
    return async () => {
      const fetchInfo = await apiCaller.put("publicityInfos/" + props.publicityInfoId, JSON.stringify({publicityAssessment}));
      return {
        statusCode: fetchInfo.statusCode,
      };
    };
  }
}
