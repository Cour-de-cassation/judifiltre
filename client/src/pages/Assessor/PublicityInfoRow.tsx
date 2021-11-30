import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { useHistory } from "react-router";
import { routes } from "../routes";

export { PublicityInfoRow };

function PublicityInfoRow(props: { publicityInfo: publicityInfoType }) {
  const history = useHistory();

  return (
    <div onClick={onRowClick}>
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

  function onRowClick() {
    history.push(
      routes.ASSESSOR_DOCUMENT.getPath({
        publicityInfoId: props.publicityInfo._id,
      })
    );
  }
}
