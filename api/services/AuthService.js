/**
 * Created by Prashant on 24/07/2017.
 */

const createLoginHistory = data => new Promise((resolve, reject) => {
  LoginHistory.create(data).then(created => resolve(created))
    .catch(e => reject(e));
});

module.exports = {
  createLoginHistory,
};
