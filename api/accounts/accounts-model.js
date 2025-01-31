const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db.select().table('accounts');
  // or return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  // never use interpolation directly inside a 
  // db.raw(SQL)... if you need to use
  // db.raw(`SELECT * FROM posts WHERE id = ?`, [id])
  // you don't want a SQL attack
  return db('accounts').where('id', id)
  // get the first one by db('accounts').where().first()
}

async function create(account) {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account, ['id', 'name', 'budget'])
  return getById(id)
  // return db('accounts').insert(account)

  // if wanting returned values...
  // db('accounts').insert(account, ['id'])
  // only postgres can return more values than id
  // or...

  // you can destructure the values to provide for
  // feedback for clients using an async/await
  // async const create = account => {
    // const [id] = await db('accounts')
    // .insert(post, ['id', 'name', 'budget'])
    //return getById(id)
}

async function updateById(id, account) {
  // DO YOUR MAGIC
  await db('accounts').where({id}).update(account, ['name', 'budget'])
  return getById(id)
  // return db('accounts').where({id}).update(account)
}

async function deleteById(id) {
  // DO YOUR MAGIC
   await db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
