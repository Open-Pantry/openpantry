
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      admin_status: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      cognito_id: DataTypes.STRING,
      name: DataTypes.STRING,
      role: DataTypes.ENUM('employee', 'read_only', 'admin')
    },

    {
      classMethods: {
        // associated with userid
        associate(models) {}
      },
      tableName: 'account',
      timestamps: false
    }
  );
  return Account;
};
