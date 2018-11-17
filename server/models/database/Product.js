module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      unit_description: DataTypes.STRING
    },

    {
      tableName: 'product',
      timestamps: true
    }
  );
  Product.associate = (models) => {
    Product.hasMany(models.Tag, {
      as: 'productTag',
      foreignKey: 'product_id',
      onDelete: 'cascade',
      hooks: 'true'
    });
  };
  return Product;
};
