const router = require('express').Router()
const Accounts = require('./accounts-model');
const {checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware');
const checkAccountId = require('./checkAccountId');
const _ = require('lodash');

router.get('/', async  (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  const id = req.params.id;

  try {
    const account = await Accounts.getById(id)
    if (!account) {
      res.status(404).send({message: "account doesn't exist"})
    } else {
      res.status(200).json(account)
    }
  } catch (error) {
    next(error)
  }

})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Accounts.deleteById(req.params.id)
    res.status(204).json(deleted)
  } catch (error) {
    next(error)
  }
})

// router.use((err, req, res, next) => { // eslint-disable-line
//   // DO YOUR MAGIC
// })

router.use((error, req, res, next) => { //eslint-disable-line
  res.status(500).json({message: error.message, stack: error.stack})
})

// router.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// if you need to get pass the no-unused-var eslint
// use this in package.json
// "eslintConig": {
  //"rules": {
    //"no-unused-vars": ["error", {"argsIgnorePattern": "next"}]
  // }
// }

module.exports = router;
