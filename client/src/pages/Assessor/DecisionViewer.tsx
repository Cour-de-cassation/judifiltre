import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
import { ButtonWithIcon } from "pelta-design-system";
import { wordings } from "../../wordings";
import { apiCaller } from "../../services/api";

export { DecisionViewer };

function DecisionViewer(props: { publicityInfoId: publicityInfoType["_id"] }) {
  return (
    <DecisionDataFetcher params={{ publicityInfoId: props.publicityInfoId }}>
      {({ decision }) => (
        <div>
          {decision}
          <div>
            <ButtonWithIcon
              color="alert"
              text={wordings.assessor.decisionViewer.buttons.nonPublic}
              iconName="lock"
              onClick={updatePublicityInfos("nonPublic")}
            />
            <ButtonWithIcon
              color="warning"
              text={wordings.assessor.decisionViewer.buttons.partiallyPublic}
              iconName="puzzle"
              onClick={updatePublicityInfos("partiallyPublic")}
            />
            <ButtonWithIcon
              color="success"
              text={wordings.assessor.decisionViewer.buttons.public}
              iconName="web"
              onClick={updatePublicityInfos("public")}
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
