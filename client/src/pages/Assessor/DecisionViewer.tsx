import React from "react";
import { customThemeType, heights, useCustomTheme } from "pelta-design-system";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
import { DecisionPublicityButton } from "./DecisionPublicityButton";
import { lineSplitter } from "../../services/lineSplitter";

export { DecisionViewer };

const LINE_MIN_HEIGHT = 10;

function DecisionViewer(props: {
  publicityInfoId: publicityInfoType["_id"] | undefined;
  nextPublicityInfoId: publicityInfoType["_id"] | undefined;
  refetchPublicityInfos: () => void;
}) {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  if (!props.publicityInfoId) {
    return (
      <div style={styles.container}>
        <div style={styles.documentContainer}>
          <table style={styles.documentTextTable}>
            <tbody>Aucune décision sélectionée.</tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <DecisionDataFetcher params={{ publicityInfoId: props.publicityInfoId }}>
        {({ decision }) => (
          <div style={styles.container}>
            <div style={styles.buttonContainer}>
              <DecisionPublicityButton
                publicityInfoId={props.publicityInfoId}
                nextPublicityInfoId={props.nextPublicityInfoId}
                publicityAssessment="notPublic"
                refetchPublicityInfos={props.refetchPublicityInfos}
              />
              <DecisionPublicityButton
                publicityInfoId={props.publicityInfoId}
                nextPublicityInfoId={props.nextPublicityInfoId}
                publicityAssessment="public"
                refetchPublicityInfos={props.refetchPublicityInfos}
              />
            </div>
            <div style={styles.documentContainer}>
              <table style={styles.documentTextTable}>
                <tbody>
                  {lineSplitter
                    .splitTextAccordingToNewLine(decision)
                    .map((line, index) => (
                      <tr key={index}>
                        <td style={styles.lineCell}>{line}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DecisionDataFetcher>
    );
  }
}

function buildStyles(theme: customThemeType) {
  return {
    container: {
      display: "flex",
      flexShrink: 1,
      flexGrow: 1,
      flexDirection: "column-reverse",
      height: heights.adminPanel,
      padding: theme.spacing * 2,
      boxSizing: "border-box",
    },
    documentContainer: {
      width: "100%",
      margin: "0 auto",
      flexGrow: 1,
      overflowY: "auto",
      backgroundColor: theme.colors.document,
      borderRadius: theme.shape.borderRadius.m,
    },
    documentTextTable: {
      padding: theme.spacing * 2,
    },
    documentFooterContainer: {
      display: "flex",
      height: "100%",
      paddingRight: theme.spacing * 2,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    lineCell: {
      height: LINE_MIN_HEIGHT,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      columnGap: theme.spacing,
      paddingTop: theme.spacing * 2,
    },
  } as const;
}
