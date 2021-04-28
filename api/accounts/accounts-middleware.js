const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: 'name and budget are required'})
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string'})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100'})
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number'})
  } else if (budget < 0 || budget >= 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'})
  } else {
    next()
  }

}

exports.checkAccountNameUnique = (req, res, next) => {
  const {name} = req.body;
 
  Accounts.getAll()
  .then(account => {
    // account.find(name)
      if (account.length !== 0) {
        if (account[0].name) {
          res.status(400).json({message: "name already exist"})
        }
      }
  })
  .catch(error => {
    next(error)
  })
}

// exports.checkAccountId = async (req, res, next) => {
//  const account = await Accounts.getById(req.params.id)
//  if (account) {
//    req.account = account
//    next()
//  } else if (!account) {
//    res.status(404).json({message: "account not found"})
//  }
// }

// function checkAccountId() {
//   return (req, res, next) => {
//    Accounts.getById(req.params.id)
//     .then(account => {
//       if (account) {
//         req.account = account
//         next()
//       } else if (!account) {
//         res.status(404).json({message: "account not found"})
//       }
//     })
//     .catch (error => {
//       next(error)
//     })
//   }
// }

// module.exports = checkAccountId;