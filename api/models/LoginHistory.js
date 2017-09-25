
module.exports = {
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      required: false,
    },
    email: {
      type: 'string',
      required: true,
    },
    sessionId: {
      type: 'string',
      required: true,
      unique: true,
    },
    useragent: {
      type: 'text',
    },
    ipAddress: {
      type: 'string',
    },
    status: {
      type: 'integer',
      defaultsTo: 1,
    },
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,
  tableName: 'loginHistory',
};
