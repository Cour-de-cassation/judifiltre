import React from "react";
import { publicityInfoType } from "judifiltre-core";

export { PublicityInfoRow };

function PublicityInfoRow(props: {
  isSelected: boolean;
  onClick: () => void;
  publicityInfo: publicityInfoType;
}) {
  const styles = buildStyles();

  return (
    <div
      onClick={props.onClick}
      style={props.isSelected ? styles.selectedContainer : undefined}
    >
      <div>{props.publicityInfo.sourceId}</div>
      <div>{props.publicityInfo.jurisdiction}</div>
      <div>{props.publicityInfo.fieldCode}</div>
      <div>
        {props.publicityInfo.publicity.clerkRequest === "unspecified"
          ? "-"
          : props.publicityInfo.publicity.clerkRequest}
      </div>
      <div>{props.publicityInfo.publicity.assessment}</div>
    </div>
  );
}

function buildStyles() {
  return {
    selectedContainer: {
      backgroundColor: "white",
      color: "black",
    },
  };
}
