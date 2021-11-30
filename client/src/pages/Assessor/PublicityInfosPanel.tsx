import React, { useState } from "react";
import { heights } from "pelta-design-system";
import { idModule, idType, publicityInfoType } from "judifiltre-core";
import { PublicityInfoRow } from "./PublicityInfoRow";
import { useHistory } from "react-router";
import { routes } from "../routes";

export { PublicityInfosPanel };

const WIDTH = 500;

function PublicityInfosPanel(props: { publicityInfos: publicityInfoType[] }) {
  const history = useHistory();
  const styles = buildStyles();
  const [selectedPublicityInfoId, setSelectedPublicityInfoId] = useState<
    idType | undefined
  >();
  return (
    <div style={styles.panel}>
      {props.publicityInfos.map((publicityInfo) => (
        <PublicityInfoRow
          isSelected={
            !!selectedPublicityInfoId &&
            idModule.lib.equalId(publicityInfo._id, selectedPublicityInfoId)
          }
          onClick={buildOnSelectPublicityInfo(publicityInfo._id)}
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
      history.push(
        routes.ASSESSOR_DOCUMENT.getPath({
          publicityInfoId,
        })
      );
      setSelectedPublicityInfoId(publicityInfoId);
    };
  }
}

function buildStyles() {
  return {
    panel: {
      width: WIDTH,
      height: heights.adminPanel,
      overflowY: "scroll",
    },
  } as const;
}
