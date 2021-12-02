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
    <tr
      onClick={props.onClick}
      style={props.isSelected ? styles.selectedContainer : styles.container}
    >
      <td style={props.isSelected ? styles.selectedFirstCells : styles.firstCells}>{props.publicityInfo.sourceId}</td>
      <td style={props.isSelected ? styles.selectedCells : styles.cells}>{props.publicityInfo.jurisdiction}</td>
      <td style={props.isSelected ? styles.selectedCells : styles.cells}>{props.publicityInfo.fieldCode}</td>
      <td style={props.isSelected ? styles.selectedCells : styles.cells}>
        {props.publicityInfo.publicity.clerkRequest === "unspecified"
          ? "-"
          : props.publicityInfo.publicity.clerkRequest}
      </td>
      <td style={props.isSelected ? styles.selectedLastCells : undefined}>{props.publicityInfo.publicity.assessment}</td>
    </tr>
  );
}

function buildStyles() {
  return {
    container: {
      cursor: "pointer",
    },
    selectedContainer: {
      cursor: "pointer",
      color: "black",
    },
    cells: { 
      padding: "15px",
    },
    firstCells: {
      padding: "15px 15px 15px 30px",
    },
    selectedCells: {
      padding: "15px",
      backgroundColor: "white",
    },
    selectedFirstCells: {
      padding: "10px 10px 10px 30px",
      backgroundColor: "white",
    },
    selectedLastCells: {
      backgroundColor: "white",
      borderRadius: "0px 50px 50px 0px",
    }
  };
}
