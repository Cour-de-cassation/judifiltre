import { publicityInfoType } from "../core";

export { routes };

const ROUTE_PREFIX = "public-or-not-public";

const routes = {
  ASSESSOR_HOME: {
    getPath: () => `/${ROUTE_PREFIX}/assessor`,
  },
  ASSESSOR_DOCUMENT: {
    getPath: (params?: Pick<publicityInfoType, "_id" | "sourceDb">) =>
      `/${ROUTE_PREFIX}/assessor/${params?._id || ":_id"}/${
        params?.sourceDb || ":sourceDb"
      }`,
  },
  DEFAULT: { getPath: () => `/${ROUTE_PREFIX}` },
};
