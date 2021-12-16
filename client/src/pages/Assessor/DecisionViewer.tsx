import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
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
            <DecisionPublicityButton 
              publicityInfoId = {props.publicityInfoId}
              publicityAssessment = "public"
            />
            <DecisionPublicityButton 
              publicityInfoId = {props.publicityInfoId}
              publicityAssessment = "notPublic"
            />
            <DecisionPublicityButton 
              publicityInfoId = {props.publicityInfoId}
              publicityAssessment = "partiallyPublic"
            />
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
