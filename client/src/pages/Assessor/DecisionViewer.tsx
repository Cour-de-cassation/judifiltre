import React, { Key } from "react";
import { customThemeType, heights, useCustomTheme } from "pelta-design-system";
import { publicityInfoType } from "judifiltre-core";
import { DecisionDataFetcher } from "./DecisionDataFetcher";
import { DecisionPublicityButton } from "./DecisionPublicityButton";
import { lineSplitter } from "../../services/lineSplitter";

export { DecisionViewer };

const LINE_MIN_HEIGHT = 10;
const TEXT_CONTENT_WIDTH = "900px";

function DecisionViewer(props: {
  publicityInfoId: publicityInfoType["_id"];
  refetchPublicityInfos: () => void;
}) {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  return (
    <DecisionDataFetcher params={{ publicityInfoId: props.publicityInfoId }}>
      {({ decision }) => (
        <div style={styles.container}>
          <div style={styles.documentHeaderContainer}></div>
          <div style={styles.documentContainer}>
            <div style={styles.documentTextContainer}>
              <table style={styles.documentTextTable}>
                {lineSplitter
                  .splitTextAccordingToNewLine(decision)
                  .map((line, index) => (
                    <tr key={index}>
                      <td style={styles.lineCell}>{line}</td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
          <div style={styles.buttonContainer}>
            <DecisionPublicityButton
              publicityInfoId={props.publicityInfoId}
              publicityAssessment="notPublic"
              refetchPublicityInfos={props.refetchPublicityInfos}
            />
            <DecisionPublicityButton
              publicityInfoId={props.publicityInfoId}
              publicityAssessment="partiallyPublic"
              refetchPublicityInfos={props.refetchPublicityInfos}
            />
            <DecisionPublicityButton
              publicityInfoId={props.publicityInfoId}
              publicityAssessment="public"
              refetchPublicityInfos={props.refetchPublicityInfos}
            />
          </div>
        </div>
      )}
    </DecisionDataFetcher>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing * 2,
    },
    documentHeaderContainer: {},
    documentContainer: {
      width: "100vw",
      maxWidth: TEXT_CONTENT_WIDTH,
      flex: 1,
      margin: "0 auto",
    },
    documentTextContainer: {
      height: "100%",
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
