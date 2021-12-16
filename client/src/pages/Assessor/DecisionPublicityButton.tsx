import React, { useState } from "react";
import { publicityInfoType } from "judifiltre-core";
import { ButtonWithIcon, iconNameType } from "pelta-design-system";
import { apiCaller } from "../../services/api";
import { wordings } from "../../wordings";

export { DecisionPublicityButton };

type publicityAssessmentType = "public" | "notPublic" | "partiallyPublic";

const buttonMapping = {
  "public": {
    iconName: "web",
    color: "success"
  },
  "notPublic": {
    iconName: "lock",
    color: "alert"
  },
  "partiallyPublic": {
    iconName: "puzzle",
    color: "warning"
  }
} as const;


function DecisionPublicityButton(props: { publicityInfoId: publicityInfoType["_id"], publicityAssessment: publicityAssessmentType}) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const {iconName, color} = buttonMapping[props.publicityAssessment];

  return (
    <ButtonWithIcon
      iconName={iconName}
      color={color}
      text={wordings.assessor.decisionViewer.buttons[props.publicityAssessment]}
      onClick={updatePublicityInfos(props.publicityAssessment)}
      isLoading={isUpdating}
    />
  );
  function updatePublicityInfos(publicityAssessment: publicityAssessmentType) {
    return async () => {
      setIsUpdating(true);
      try{
        const fetchInfo = await apiCaller.put("publicityInfos/" + props.publicityInfoId, JSON.stringify({publicityAssessment}));
        setIsUpdating(false);
        return {
          statusCode: fetchInfo.statusCode,
        };
      }catch(e){
        console.warn(e);
        setIsUpdating(false);
      }
    };
  }
}