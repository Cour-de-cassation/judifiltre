import React, { useState } from "react";
import { heights } from "pelta-design-system";
import {
  idModule,
  idType,
  publicityInfoModule,
  publicityInfoType,
} from "judifiltre-core";
import { PublicityInfoRow } from "./PublicityInfoRow";
import { useHistory } from "react-router";
import { routes } from "../routes";

export { PublicityInfosPanel };

const WIDTH = 550;

function PublicityInfosPanel(props: { publicityInfos: publicityInfoType[] }) {
  const history = useHistory();
  const styles = buildStyles();
  const sortedPublicityInfos = props.publicityInfos.sort(comparePublicityInfos);
  const [selectedPublicityInfoId, setSelectedPublicityInfoId] = useState<
    idType | undefined
  >();
  return (
    <div style={styles.panel}>
      <h2 style={styles.title}>Décisions en attente ({sortedPublicityInfos.length})</h2>
      <table style={styles.table}>
        <tr>
          <th style={styles.firstCell}>ID</th>
          <th>Siège</th>
          <th>NAC</th>
          <th>Demande</th>
          <th>Diffusion</th>
        </tr>
        {sortedPublicityInfos.map((publicityInfo) => (
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
      </table>
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

function comparePublicityInfos(
  publicityInfo1: publicityInfoType,
  publicityInfo2: publicityInfoType
) {
  if (
    !publicityInfo1.publicity.assessment &&
    publicityInfo2.publicity.assessment
  ) {
    return -1;
  }
  if (
    publicityInfo1.publicity.assessment &&
    !publicityInfo2.publicity.assessment
  ) {
    return 1;
  }
  return 0;
}

function buildStyles() {
  return {
    panel: {
      width: WIDTH,
      height: heights.adminPanel,
      overflowY: "scroll",
    },
    title: {
      paddingLeft: "30px",
    },
    table: {
      borderSpacing: 0,
      textAlign: "left",
    },
    firstCell: {
      paddingLeft: "30px"
    }
  } as const;
}
