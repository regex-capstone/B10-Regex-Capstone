import Database from "../database/DatabaseInterface";
import MockPage from "./data/MockPage";
import MockUser from "./data/MockUser";

async function init() {
  console.log('Initializing mock database...');
  // yadda yadda yadda
  return true
}

const x = await init();
console.log(x ? 'Mock database initialized' : 'Mock database failed to initialize');

const mockDatabase: Database = {
  getPage: (id: string) => {
    return Promise.resolve({
      ...MockPage,
      id: id
    });
  },

  getUser: (id: string) => {
    return Promise.resolve({
      ...MockUser,
      id: id
    });
  },

  search: (options?: any) => {
    return Promise.resolve([MockPage]);
  }
};

export default mockDatabase;