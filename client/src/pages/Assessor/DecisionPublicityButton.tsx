import React, { useState } from "react";
import { publicityInfoType } from "judifiltre-core";
import { ButtonWithIcon } from "pelta-design-system";
import { apiCaller } from "../../services/api";
import { wordings } from "../../wordings";
import { useHistory } from "react-router";
import { routes } from "../routes";

export { DecisionPublicityButton };

type publicityAssessmentType = "public" | "notPublic" | "partiallyPublic";

const buttonMapping = {
  public: {
    iconName: "web",
    color: "success",
  },
  notPublic: {
    iconName: "lock",
    color: "alert",
  },
  partiallyPublic: {
    iconName: "puzzle",
    color: "warning",
  },
} as const;

function DecisionPublicityButton(props: {
  publicityInfoId: publicityInfoType["_id"] | undefined;
  publicityAssessment: publicityAssessmentType;
  refetchPublicityInfos: () => void;
}) {
  const history = useHistory();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { iconName, color } = buttonMapping[props.publicityAssessment];

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
      try {
        await apiCaller.put(
          "publicityInfos/" + props.publicityInfoId,
          JSON.stringify({ publicityAssessment })
        );
        setIsUpdating(false);
        history.push(routes.ASSESSOR_HOME.getPath());
        props.refetchPublicityInfos();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsUpdating(false);
      }
    };
  }
}
