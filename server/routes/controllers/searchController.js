// Load DB models
const Connections = require('../../models/Connection');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Load validator
const validateQueryInput = require('../../validation/query');

// Load utils
const { removeDuplicatesById, removeDuplicatesByProp } = require('../../utils/removeDuplicates');

const findProfileByName = (nameText, pageNumberInput = 0, nPerPage) => {
  // pagination
  const pageNumber = pageNumberInput ? pageNumberInput : 0;
  // const nPerPage = 10;

  return User.find({ "name": { $regex: nameText, $options: 'i' }})
  .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
  .limit(nPerPage)
  .then(users => {
    const userIds = users.map(user => {
      return user._id;
    });
    
    return Profile.find({ user: { $in: userIds } })
      .populate('user', ['name', 'email', 'avatar']);
  })
  .catch(err => new Error(err));
};

const searchGeneral = (req, res) => {
  const { q: query } = req.query;

  const { errors, isValid } = validateQueryInput(query);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // const nameQuery = User.find({ "name": { $regex: query, $options: 'i' }})
  //   .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
  //   .limit(nPerPage)
  //   .then(users => {
  //     const userIds = users.map(user => {
  //       return user._id;
  //     });
      
  //     return Profile.find({ user: { $in: userIds } }).populate('user', ['name', 'email', 'avatar']);
  //   });

  // pagination
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  const nPerPage = 10;
  
  const profileByNameQuery = findProfileByName(query, pageNumber, nPerPage);

  // const profileByHandleQuery = Profile.find({ "handle": { $regex: query, $options: 'i' }})
  //   .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
  //   .limit(nPerPage)
  //   .populate('user', ['name', 'email', 'avatar']);

  // const profileByCompanyQuery = Profile.find({ "company": { $regex: query, $options: 'i' }})
  //   .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
  //   .limit(nPerPage)
  //   .populate('user', ['name', 'email', 'avatar']);

  const profileQuery = Profile.find({
    $or: [
      { "handle": { $regex: query, $options: 'i' }},
      { "company": { $regex: query, $options: 'i' }}
    ]
  }).skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
    .limit(nPerPage)
    .populate('user', ['name', 'email', 'avatar']);

  Promise.all([
    profileByNameQuery, 
    // profileByHandleQuery, 
    // profileByCompanyQuery
    profileQuery
  ]).then(([profileByNames, profiles]) => {
    const allResults = [
      ...profileByNames,
      ...profiles      
    ];
    const uniqueResults = removeDuplicatesById(allResults);
    res.json(uniqueResults);
  }).catch(err => res.status(400).send(err));
};

const searchName = (req, res) => {
  const { q: query } = req.query;

  const { errors, isValid } = validateQueryInput(query);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // pagination
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  const nPerPage = 10;

  User.find({ "name": { $regex: query, $options: 'i' }})
    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
    .limit(nPerPage)
    .then(docs => res.json(docs))
    .catch(err => res.status(400).send(err));
};

module.exports = {
  searchGeneral,
  searchName
};