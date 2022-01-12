import React from "react";
import { useParams } from "react-router-dom";
import { idModule } from "judifiltre-core";
import { DecisionViewer } from "./DecisionViewer";
import { PublicityInfosDataFetcher } from "./PublicityInfosDataFetcher";
import { PublicityInfosPanel } from "./PublicityInfosPanel";
import {
  Header,
  Text,
  MenuBar,
  useCustomTheme,
  heights,
} from "pelta-design-system";
import { Button } from "pelta-design-system/dist/components/custom";

export { Assessor };

type assessorParamsType = {
  publicityInfoId?: string;
};

function Assessor() {
  const params = useParams<assessorParamsType>();

  const publicityInfoId = params?.publicityInfoId
    ? idModule.lib.buildId(params.publicityInfoId)
    : undefined;

  const theme = useCustomTheme();
  const styles = buildStyles();

  return (
    <>
      <MenuBar color="inherit" isElevated={true}>
        <Header
          leftHeaderComponents={buildLeftHeaderComponents()}
          rightHeaderComponents={buildRightHeaderComponents()}
          spaceBetweenComponents={theme.spacing * 2}
          style={styles.header}
          variant="classic"
        />
      </MenuBar>
      <PublicityInfosDataFetcher>
        {({ publicityInfos, refetch }) =>
          publicityInfos.length > 0 ? (
            <div style={styles.container}>
              <PublicityInfosPanel
                publicityInfos={publicityInfos}
                selectedPublicityInfoId={
                  publicityInfoId ?? publicityInfos[0]._id
                }
              />
              <DecisionViewer
                publicityInfoId={publicityInfoId ?? publicityInfos[0]._id}
                refetchPublicityInfos={refetch}
              />
            </div>
          ) : (
            <div>Pas de publicity Infos à traiter</div>
          )
        }
      </PublicityInfosDataFetcher>
    </>
  );

  function buildStyles() {
    return {
      container: {
        display: "flex",
        fontFamily: "sans-serif",
      },
      header: {
        height: heights.header,
        paddingLeft: `${theme.spacing * 4}px`,
      },
      composedTitleContainer: {
        display: "flex",
      },
    };
  }

  function buildRightHeaderComponents() {
    return [];
  }

  function buildLeftHeaderComponents() {
    return [
      <div style={styles.composedTitleContainer} key={"leftHeaderComponents"}>
        <h1>Judifiltre</h1>
      </div>,
    ];
  }
}
