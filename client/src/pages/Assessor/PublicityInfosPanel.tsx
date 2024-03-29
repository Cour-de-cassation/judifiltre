import React from "react";
import {
  customThemeType,
  heights,
  Text,
  useCustomTheme,
} from "pelta-design-system";
import { idModule, publicityInfoType } from "judifiltre-core";
import { PublicityInfoRow } from "./PublicityInfoRow";
import { useHistory } from "react-router";
import { routes } from "../routes";

export { PublicityInfosPanel };

const WIDTH = 650;

function PublicityInfosPanel(props: {
  publicityInfos: publicityInfoType[];
  selectedPublicityInfoId: publicityInfoType["_id"] | undefined;
}) {
  const history = useHistory();
  const theme = useCustomTheme();
  const styles = buildStyles(theme);
  const sortedPublicityInfos = props.publicityInfos.sort(comparePublicityInfos);
  return (
    <div style={styles.panel}>
      <h2 style={styles.title}>
        Décisions en attente ({sortedPublicityInfos.length})
      </h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.firstCell}>
              <Text>ID</Text>
            </th>
            <th>
              <Text>Date</Text>
            </th>
            <th>
              <Text>Siège</Text>
            </th>
            <th>
              <Text>NAC</Text>
            </th>
            <th>
              <Text>Orientation</Text>
            </th>
            <th>
              <Text>Diffusion</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPublicityInfos.map((publicityInfo) => (
            <PublicityInfoRow
              isSelected={
                !!props.selectedPublicityInfoId &&
                idModule.lib.equalId(
                  publicityInfo._id,
                  props.selectedPublicityInfoId
                )
              }
              onClick={buildOnSelectPublicityInfo(publicityInfo._id)}
              key={publicityInfo.sourceId}
              publicityInfo={publicityInfo}
            />
          ))}
        </tbody>
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

function buildStyles(theme: customThemeType) {
  return {
    panel: {
      height: heights.adminPanel,
      overflowY: "scroll",
      flexShrink: 0,
    },
    title: {
      paddingLeft: `${theme.spacing * 4}px`,
    },
    table: {
      borderSpacing: 0,
      textAlign: "left",
    },
    firstCell: {
      paddingLeft: `${theme.spacing * 4}px`,
    },
  } as const;
}
