import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { ButtonWithIcon } from "pelta-design-system";
import { apiCaller } from "../../services/api";

export { DecisionPublicityButton };

function DecisionPublicityButton(props: { publicityInfoId: publicityInfoType["_id"], publicityAssessment: string}) {
  return (
    <ButtonWithIcon
      text=""
      iconName="lock"
      {...props}
      onClick={updatePublicityInfos(props.publicityAssessment)}
    />
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
