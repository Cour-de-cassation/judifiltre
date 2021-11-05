import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { idModule, publicityInfoType } from "judifiltre-core";
import { routes } from "../routes";
import { DecisionViewer } from "./DecisionViewer";
import { PublicityInfosDataFetcher } from "./PublicityInfosDataFetcher";

export { Assessor };

type assessorParamsType =
  | {
      publicityInfoId: string;
    }
  | undefined;

function Assessor() {
  const params = useParams<assessorParamsType>();
  const history = useHistory();

  const publicityInfoId = params?.publicityInfoId
    ? idModule.lib.buildId(params.publicityInfoId)
    : undefined;

  return (
    <div>
      <PublicityInfosDataFetcher>
        {({ publicityInfos }) => (
          <div>
            {publicityInfos.map((publicityInfo) => (
              <div
                key={publicityInfo.sourceId}
                onClick={buildOnSelectPublicityInfo(publicityInfo._id)}
              >
                {publicityInfo._id}
              </div>
            ))}
          </div>
        )}
      </PublicityInfosDataFetcher>
      {!!publicityInfoId && (
        <DecisionViewer publicityInfoId={publicityInfoId} />
      )}
    </div>
  );

  function buildOnSelectPublicityInfo(
    publicityInfoId: publicityInfoType["_id"]
  ) {
    return () => {
      history.push(routes.ASSESSOR_DOCUMENT.getPath({ publicityInfoId }));
    };
  }
}
