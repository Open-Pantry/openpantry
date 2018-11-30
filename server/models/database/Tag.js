module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: DataTypes.STRING,
      product_id:DataTypes.NUMERIC,
      organization_id:DataTypes.NUMERIC,
      event_id:DataTypes.NUMERIC
    },

    {
      tableName: 'tag',
      timestamps: false
    }
  );
  Tag.associate = function (models) {};
  return Tag;
};
