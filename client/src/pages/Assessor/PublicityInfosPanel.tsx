import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { useHistory } from "react-router";
import { routes } from "../routes";
import { tableRowFieldType, Text } from "pelta-design-system";
import { wordings } from "../../wordings";
import { PublicityInfoRow } from "./PublicityInfoRow";

export { PublicityInfosPanel };

function PublicityInfosPanel(props: { publicityInfos: publicityInfoType[] }) {
  const history = useHistory();

  return (
    <div>
      {props.publicityInfos.map((publicityInfo) => (
        <PublicityInfoRow
          key={publicityInfo.sourceId}
          publicityInfo={publicityInfo}
        />
      ))}
    </div>
  );

  function buildOnSelectPublicityInfo(
    publicityInfoId: publicityInfoType["_id"]
  ) {
    return () => {
      history.push(routes.ASSESSOR_DOCUMENT.getPath({ publicityInfoId }));
    };
  }
}
