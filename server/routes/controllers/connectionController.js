import mongoose from 'mongoose';
// Load model
const Connection = require('./../../models/Connection');

// Load validator
const validateConnectionRequest = require('./../../validation/connection');

const connectionAdd = (req, res) => {
  const { errors, isValid } = validateConnectionRequest(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userId = req.user._id;
  const selfProfileId = req.body.selfProfileId;
  const connectToUserId = req.body.userId;
  const connectToProfileId = req.body.profileId;

  /* if user A is requesting connection to user B, connection docs for both users are updated
   * 1. user B will be added to pendingRequestTo of user A's doc
   * 2. user A will be added to pendingRequestFrom of user B's doc
   */
  const requesterPromise = Connection.findOne({ user: userId })
    .then(doc => {
      if (!doc) {
        const connectionFields = {
          user: userId,
          pendingRequestTo: [{
            user: connectToUserId,
            profile: connectToProfileId
          }]
        };

        const newConnection = new Connection(connectionFields);
        return newConnection.save();
      } else {
        return Connection.findOneAndUpdate({
          $and: [
            { user: userId },
            { "connections.user": { $ne: connectToUserId } },
            { "pendingRequestTo.user": { $ne: connectToUserId } },
            { "pendingRequestFrom.user": { $ne: connectToUserId } }
          ]
          }, {
            $addToSet: {
              pendingRequestTo: {
                user: connectToUserId,
                profile: connectToProfileId
              }
            }
          }, {
            new: true
          });
      }
    })
    .catch(err => Promise.reject(err));

  const receiverPromise = Connection.findOne({ user: connectToUserId })
    .then(doc => {
      if (!doc) {
        const connectionFields = {
          user: connectToUserId,
          pendingRequestFrom: [{
            user: userId,
            profile: selfProfileId
          }]
        };

        const newConnection = new Connection(connectionFields);
        return newConnection.save();
      } else {
        return Connection.findOneAndUpdate({
          $and: [
            { user: connectToUserId },
            { "connections.user": { $ne: userId } },
            { "pendingRequestTo.user": { $ne: userId } },
            { "pendingRequestFrom.user": { $ne: userId } }
          ]
        }, {
            $addToSet: {
              pendingRequestFrom: {
                user: userId,
                profile: selfProfileId
              }
            }
          }, {
            new: true
          });
      }
    })
  .catch(err => Promise.reject(err));

  Promise.all([requesterPromise, receiverPromise])
    .then(([requesterSuccess, receiverSuccess]) => {
      if (!requesterSuccess || !receiverSuccess) {
        res.json({ connectionSent: false });
      } else {
        res.json({ connectionSent: true });
      }
    })
    .catch(err => res.status(400).json(err));

};


const conenctionRemove = (req, res) => {
  const { errors, isValid } = validateConnectionRequest(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userId = req.user._id;
  const connectToUserId = req.body.userId;

  // Promise 1 - Update connections of the remover
  const removerConnectionUpdate = Connection.findOneAndUpdate({
    user: userId,
    "connections.user": connectToUserId
  }, {
      $pull: {
        connections: {
          user: connectToUserId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  // Promise 2 - Update connections of the one being removed
  const removedConnectionUpdate = Connection.findOneAndUpdate({
    user: connectToUserId,
    "connections.user": userId
  }, {
      $pull: {
        connections: {
          user: userId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  Promise.all([removerConnectionUpdate, removedConnectionUpdate])
    .then(results => {
      if (!results[0] || !results[1]) {
        errors.removeConnection = 'Unable to remove connection';
        res.status(400).json({
          connectionRemoved: false,
          errors
        });
      } else {
        res.json({ connectionRemoved: true });
      }
    })
    .catch(err => res.status(400).json(err));
};


const connectionApprove = (req, res) => {
  const { errors, isValid } = validateConnectionRequest(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userId = req.user._id;
  const selfProfileId = req.body.selfProfileId;
  const connectToUserId = req.body.userId;
  const connectToProfileId = req.body.profileId;

  if (userId === connectToUserId) {
    errors.userId = 'User ids must be different';
    return res.status(400);
  }

  // Promise 1 - In Approver doc - remove pendingRequestFrom 
  const removePendingRequestFrom = Connection.findOneAndUpdate({
    user: userId,
    "pendingRequestFrom.user": connectToUserId
  }, {
      $pull: {
        pendingRequestFrom: {
          user: connectToUserId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  // Promise 2 - In Approver doc - add to connections
  const addToApproverConnection = Connection.findOneAndUpdate({
    user: userId,
    "connections.user": { $ne: connectToUserId }
  }, {
      $addToSet: {
        connections: {
          user: connectToUserId,
          profile: connectToProfileId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  // Promise 3 - In Requester doc - remove pendingRequestTo 
  const removePendingRequestTo = Connection.findOneAndUpdate({
    user: connectToUserId,
    "pendingRequestTo.user": userId
  }, {
      $pull: {
        pendingRequestTo: {
          user: userId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  // Promise 4 - In Requester doc - add to connections
  const addToRequesterConnection = Connection.findOneAndUpdate({
    user: connectToUserId,
    "connections.user": { $ne: userId }
  }, {
      $addToSet: {
        connections: {
          user: userId,
          profile: selfProfileId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  Promise.all([
    removePendingRequestFrom,
    addToApproverConnection,
    removePendingRequestTo,
    addToRequesterConnection
  ]).then(results => {
    if (!results[0] || !results[1] || !results[2] || !results[3]) {
      errors.approveConnection = 'Unable to approve connection';
      res.status(400).json({
        connectionApproved: false,
        errors
      });
    } else {
      res.json({ connectionApproved: true });
    }
  }).catch(err => res.status(400).send())
};


const connectionDecline = (req, res) => {
  const { errors, isValid } = validateConnectionRequest(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userId = req.user._id;
  // const selfProfileId = req.body.selfProfileId;
  const connectToUserId = req.body.userId;
  // const connectToProfileId = req.body.profileId;

  if (userId === connectToUserId) {
    errors.userId = 'User ids must be different';
    return res.status(400);
  }

  // Promise 1 - In Decliner doc - remove pendingRequestFrom 
  const removePendingRequestFrom = Connection.findOneAndUpdate({
    user: userId,
    "pendingRequestFrom.user": connectToUserId
  }, {
      $pull: {
        pendingRequestFrom: {
          user: connectToUserId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  // Promise 2 - In Requester doc - remove pendingRequestTo 
  const removePendingRequestTo = Connection.findOneAndUpdate({
    user: connectToUserId,
    "pendingRequestTo.user": userId
  }, {
      $pull: {
        pendingRequestTo: {
          user: userId
        }
      }
    }, {
      upsert: false,
      new: true
    });

  Promise.all([
    removePendingRequestFrom,
    removePendingRequestTo
  ]).then(results => {
    if (!results[0] || !results[1]) {
      errors.declineConnection = 'Unable to decline connection';
      res.status(400).json({
        connectionDeclined: false,
        errors
      });
    } else {
      res.json({ connectionDeclined: true });
    }
  }).catch(err => res.status(400).send())
};


const connectionGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;

  // pagination
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  const nPerPage = 20;
  const startConnectionsIndex = pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0;
  const endConnectionsIndex = startConnectionsIndex + nPerPage;

  Connection.findOne({ user: userId })
    .populate('connections.user', ['name', 'avatar'])
    .populate('connections.profile', ['status', 'company', 'location'])
    .then(doc => {
      if (!doc || doc.connections.length === 0) {
        errors.connection = 'no connection found';
        res.status(404).json(errors);
      } else {
        const result = doc.connections.filter((element, index) => {
          if (index >= startConnectionsIndex && index < endConnectionsIndex) {
            return element;
          }
        });

        res.json(result);
      }
    })
    .catch(err => res.status(400).send(err));
};


const connectionCountGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;

  Connection.findOne({ user: userId })
    .then(doc => {
      if (!doc || doc.connections.length === 0) {
        res.json({ numConnections: 0 });
      } else {
        res.json({ numConnections: doc.connections.length });
      }
    })
    .catch(err => res.status(400).send(err));
};

const connectionCountByUserIdGet = (req, res) => {
  const errors = {};
  const userId = req.params.userId;

  Connection.findOne({ user: userId })
    .then(doc => {
      if (!doc || doc.connections.length === 0) {
        res.json({ numConnections: 0 });
      } else {
        res.json({ numConnections: doc.connections.length });
      }
    })
    .catch(err => res.status(400).send(err));
}


const pendingRequestCountGet = (req, res) => {
  // const errors = {};
  const userId = req.user._id;

  Connection.findOne({ user: userId })
    .then(doc => {
      if (!doc || doc.pendingRequestFrom.length === 0) {
        res.json({ numPendingRequests: 0 });
      } else {
        res.json({ numPendingRequests: doc.pendingRequestFrom.length });
      }
    })
    .catch(err => res.status(400).send(err));
};


const pendingRequestGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;

  Connection.findOne({ user: userId })
    .populate('pendingRequestFrom.user', ['name', 'avatar'])
    .populate('pendingRequestFrom.profile', ['status', 'company', 'location'])
    .then(doc => {
      if (!doc || doc.pendingRequestFrom.length === 0) {
        res.json({
          numPendingRequests: 0,
          pendingRequests: []
        });
      } else {
        res.json({
          numPendingRequests: doc.pendingRequestFrom.length,
          pendingRequests: doc.pendingRequestFrom
        });
      }
    })
    .catch(err => res.status(400).send(err));
}


const connectionStatusGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;
  const visitingUserId = req.params.userId;

  if (userId === visitingUserId) {
    errors.userId = 'Target user id must not be the same';
    return res.status(400).json(errors);
  }

  Connection.aggregate([{
    $match: { user: userId }
  }, {
    $project: {
      "_id": 1,
      "user": 1,
      "visitingUserId": visitingUserId,
      // check if targetUserId in connections
      "connected": {
        $cond: {
          if: {
            $gte: [{
              $indexOfArray: [
                "$connections.user",
                mongoose.Types.ObjectId(visitingUserId)
              ]
            }, 0]
          },
          then: true,
          else: false
        }
      },
      // check if targetUserId in pendingRequestFrom
      "pendingRequestFrom": {
        $cond: {
          if: {
            $gte: [{
              $indexOfArray: [
                "$pendingRequestFrom.user",
                mongoose.Types.ObjectId(visitingUserId)
              ]
            }, 0]
          },
          then: true,
          else: false
        }
      },
      // check if targetUserId in pendingRequestTo
      "pendingRequestTo": {
        $cond: {
          if: {
            $gte: [{
              $indexOfArray: [
                "$pendingRequestTo.user",
                mongoose.Types.ObjectId(visitingUserId)
              ]
            }, 0]
          },
          then: true,
          else: false
        }
      }
    }
  }]).then(connectionDoc => {
    res.json(connectionDoc[0]);
  }).catch(err => res.status(400).json(err));
}


module.exports = {
  connectionAdd,
  conenctionRemove,
  connectionApprove,
  connectionDecline,
  connectionGet,
  connectionCountGet,
  connectionCountByUserIdGet,
  connectionStatusGet,
  pendingRequestCountGet,
  pendingRequestGet
};