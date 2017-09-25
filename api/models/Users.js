const bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      required: false,
    },
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    mobile: {
      type: 'string',
      required: true,
    },
    city: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    dob: {
      type: 'string',
    },
    pincode: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    userType: {
      type: 'string',
      required: true,
    },
    useragent: {
      type: 'string',
    },
    ipAddress: {
      type: 'string',
    },
    status: {
      type: 'integer',
      defaultsTo: 1,
    },
    createdBy: {
      type: 'string',
    },
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,
  tableName: 'users',
  beforeCreate(user, cb) {
    const user1 = user;
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user1.password, salt, (err, hash) => { // eslint-disable-line consistent-return
        if(!err) {
          user1.password = hash;
          return cb();
        }
        cb(err);
      });
    });
  },

  beforeUpdate(user, cb) {
    const user1 = user;
    if(user1.password) {
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(user1.password, salt, (err, hash) => { // eslint-disable-line consistent-return
          if(!err) {
            user1.password = hash;
            return cb();
          }
          cb(err);
        });
      });
    }
  },
};
