import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { publicityInfoModule, publicityInfoType } from "judifiltre-core";
import { routes } from "../routes";
import { DecisionViewer } from "./DecisionViewer";
import { PublicityInfosDataFetcher } from "./PublicityInfosDataFetcher";

export { Assessor };

type assessorParamsType =
  | {
      _id: string;
      sourceDb: string;
    }
  | undefined;

function Assessor() {
  const params = useParams<assessorParamsType>();
  const history = useHistory();
  const parsedParams = params
    ? publicityInfoModule.lib.converter.convertParameters(params)
    : undefined;

  return (
    <div>
      <PublicityInfosDataFetcher>
        {({ publicityInfos }) => (
          <div>
            {publicityInfos.map((publicityInfo) => (
              <div
                key={publicityInfo._id}
                onClick={buildOnSelectPublicityInfo(publicityInfo)}
              >
                {publicityInfo._id}
              </div>
            ))}
          </div>
        )}
      </PublicityInfosDataFetcher>
      {!!parsedParams && <DecisionViewer decisionParams={parsedParams} />}
    </div>
  );

  function buildOnSelectPublicityInfo(publicityInfo: publicityInfoType) {
    return () => {
      history.push(routes.ASSESSOR_DOCUMENT.getPath(publicityInfo));
    };
  }
}
