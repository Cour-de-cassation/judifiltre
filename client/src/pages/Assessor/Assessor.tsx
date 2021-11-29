import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { idModule, publicityInfoType } from "judifiltre-core";
import { routes } from "../routes";
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

  return (
    <div>
      <PublicityInfosDataFetcher>
        {({ publicityInfos }) =>
          publicityInfos.length > 0 ? (
            <PublicityInfosPanel publicityInfos={publicityInfos} />
          ) : (
            <div>Pas de publicity Infos à traiter</div>
          )
        }
      </PublicityInfosDataFetcher>
      {!!publicityInfoId && (
        <DecisionViewer publicityInfoId={publicityInfoId} />
      )}
    </div>
  );
}
