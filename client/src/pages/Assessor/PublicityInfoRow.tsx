import React from "react";
import { publicityInfoType } from "judifiltre-core";
import { customThemeType, useCustomTheme } from "pelta-design-system";

export { PublicityInfoRow };

function PublicityInfoRow(props: {
  isSelected: boolean;
  onClick: () => void;
  publicityInfo: publicityInfoType;
}) {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  return (
    <tr
      onClick={props.onClick}
      style={props.isSelected ? styles.selectedContainer : styles.container}
    >
      <td
        style={props.isSelected ? styles.selectedFirstCells : styles.firstCells}
      >
        {props.publicityInfo.sourceId}
      </td>
      <td style={props.isSelected ? styles.selectedCells : styles.cells}>
        {props.publicityInfo.jurisdiction}
      </td>
      <td style={props.isSelected ? styles.selectedCells : styles.cells}>
        {props.publicityInfo.fieldCode}
      </td>
      <td style={props.isSelected ? styles.selectedCells : styles.cells}>
        {props.publicityInfo.publicity.clerkRequest === "unspecified"
          ? "-"
          : props.publicityInfo.publicity.clerkRequest}
      </td>
      <td style={props.isSelected ? styles.selectedLastCells : undefined}>
        {props.publicityInfo.publicity.assessment}
      </td>
    </tr>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    container: {
      cursor: "pointer",
    },
    selectedContainer: {
      cursor: "pointer",
      color: "black",
    },
    cells: {
      padding: theme.spacing * 2,
    },
    firstCells: {
      padding: `${theme.spacing * 2}px ${theme.spacing * 2}px ${
        theme.spacing * 2
      }px ${theme.spacing * 4}px`,
    },
    selectedCells: {
      padding: theme.spacing * 2,
      backgroundColor: "white",
    },
    selectedFirstCells: {
      padding: `${theme.spacing}px ${theme.spacing}px ${theme.spacing}px ${
        theme.spacing * 4
      }px`,
      backgroundColor: "white",
    },
    selectedLastCells: {
      backgroundColor: "white",
      borderRadius: `0px ${theme.shape.borderRadius.l}px ${theme.shape.borderRadius.l}px 0px`,
    },
  };
}
