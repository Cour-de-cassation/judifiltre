import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
import { ButtonWithIcon } from "pelta-design-system";
import { wordings } from "../../wordings";

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
            />
            <ButtonWithIcon
              color="warning"
              text={wordings.assessor.decisionViewer.buttons.partiallyPublic}
              iconName="puzzle"
            />
            <ButtonWithIcon
              color="success"
              text={wordings.assessor.decisionViewer.buttons.public}
              iconName="web"
            />
          </div>
        </div>
      )}
    </DecisionDataFetcher>
  );
}
