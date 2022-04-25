const authResolver = require("./auth");
const expenseResolver = require("./expenses");

const rootResolver = {
  ...authResolver,
  ...expenseResolver,
};

module.exports = rootResolver;
