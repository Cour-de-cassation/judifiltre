import { publicityInfo_123454 } from "./storage/123454";
import { publicityInfo_123455 } from "./storage/123455";
import { publicityInfo_123456 } from "./storage/123456";

export { buildRepository };

function buildRepository() {
  return {
    findAll,
  };

  async function findAll() {
    return [publicityInfo_123454, publicityInfo_123455, publicityInfo_123456];
  }
}
