import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { PublicityInfoRow } from "./PublicityInfoRow";
import { heights } from "pelta-design-system";

export { PublicityInfosPanel };

const WIDTH = 500;

function PublicityInfosPanel(props: { publicityInfos: publicityInfoType[] }) {
  const styles = buildStyles();
  return (
    <div style={styles.panel}>
      {props.publicityInfos.map((publicityInfo) => (
        <PublicityInfoRow
          key={publicityInfo.sourceId}
          publicityInfo={publicityInfo}
        />
      ))}
    </div>
  );
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
