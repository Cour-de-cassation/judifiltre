import { publicityInfoType } from "judifiltre-core";

export { routes };

const ROUTE_PREFIX = "judifiltre";

const routes = {
  ASSESSOR_HOME: {
    getPath: () => `/${ROUTE_PREFIX}/assessor`,
  },
  ASSESSOR_DOCUMENT: {
    getPath: (params?: { publicityInfoId: publicityInfoType["_id"] }) =>
      `/${ROUTE_PREFIX}/assessor/${
        params?.publicityInfoId || ":publicityInfoId"
      }`,
  },
  DEFAULT: { getPath: () => `/${ROUTE_PREFIX}` },
};
