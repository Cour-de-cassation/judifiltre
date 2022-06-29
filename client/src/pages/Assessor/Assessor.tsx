import React from "react";
import { useParams } from "react-router-dom";
import { idModule } from "judifiltre-core";
import { DecisionViewer } from "./DecisionViewer";
import { PublicityInfosDataFetcher } from "./PublicityInfosDataFetcher";
import { PublicityInfosPanel } from "./PublicityInfosPanel";
import {
  Header,
  MenuBar,
  useCustomTheme,
  heights,
  Text,
} from "pelta-design-system";
import { LogoutButton } from "../../components";

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
        {({ publicityInfos, refetch }) => {
          console.log(publicityInfos);
          return publicityInfos.length > 0 ? (
            <div style={styles.container}>
              <PublicityInfosPanel
                publicityInfos={publicityInfos}
                selectedPublicityInfoId={publicityInfoId}
              />
              <DecisionViewer
                publicityInfoId={publicityInfoId}
                refetchPublicityInfos={refetch}
              />
            </div>
          ) : (
            <Text>Pas de publicity Infos à traiter</Text>
          );
        }}
      </PublicityInfosDataFetcher>
    </>
  );

  function buildStyles() {
    return {
      container: {
        display: "flex",
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
    return [<LogoutButton key="logoutButton" />];
  }

  function buildLeftHeaderComponents() {
    return [
      <div style={styles.composedTitleContainer} key={"leftHeaderComponents"}>
        <h1>Judifiltre</h1>
      </div>,
    ];
  }
}
