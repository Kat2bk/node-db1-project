const Accounts = require('./accounts-model');

function checkAccountId() {
    return (req, res, next) => {
     Accounts.getById(req.params.id)
      .then(account => {
        if (account) {
          req.account = account
          next()
        } else if (!account) {
          res.status(404).json({message: "account not found"})
        }
      })
      .catch (error => {
        next(error)
      })
    }
  }
  
  module.exports = checkAccountId;