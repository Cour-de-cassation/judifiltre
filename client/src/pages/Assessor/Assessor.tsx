import React from "react";
import { useParams } from "react-router-dom";
import { idModule } from "judifiltre-core";
import { DecisionViewer } from "./DecisionViewer";
import { PublicityInfosDataFetcher } from "./PublicityInfosDataFetcher";
import { PublicityInfosPanel } from "./PublicityInfosPanel";

export { Assessor };

type assessorParamsType = {
  publicityInfoId?: string;
};

function Assessor() {
  const params = useParams<assessorParamsType>();

  const publicityInfoId = params?.publicityInfoId
    ? idModule.lib.buildId(params.publicityInfoId)
    : undefined;

  const styles = buildStyles();

  return (
    <PublicityInfosDataFetcher>
      {({ publicityInfos, refetch }) =>
        publicityInfos.length > 0 ? (
          <div style={styles.container}>
            <PublicityInfosPanel publicityInfos={publicityInfos} />
            {!!publicityInfoId && (
              <DecisionViewer publicityInfoId={publicityInfoId} refetchPublicityInfos={refetch} />
            )}
          </div>
        ) : (
          <div>Pas de publicity Infos à traiter</div>
        )
      }
    </PublicityInfosDataFetcher>
  );
}

function buildStyles() {
  return {
    container: {
      display: "flex",
      fontFamily: "sans-serif",
    },
  };
}
