const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      admin_status: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set: (v) => {
          const password = bcrypt.hashSync(v, 5);
          return this.setDataValue('password', password);
        }
      },
      name: DataTypes.STRING,
      role: DataTypes.ENUM('employee', 'read_only', 'admin')
    },

    {
      classMethods: {
        // associated with userid
        associate(models) {}
      },
      tableName: 'account',
      timestamps: true
    }
  );
  return Account;
};
