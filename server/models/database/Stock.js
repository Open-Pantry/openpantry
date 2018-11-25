module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    'Stock',
    {
      amount: DataTypes.DOUBLE
    },

    {
      tableName: 'stock',
      timestamps: false
    }
  );
  Stock.associate = (models) => {
    Stock.belongsTo(models.Product, { as: 'stockProduct', foreignKey: 'product_id' });
    Stock.belongsTo(models.Organization, {
      as: 'stockOrganization',
      foreignKey: 'organization_id'
    });
  };

  return Stock;
};
