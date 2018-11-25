module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: DataTypes.STRING
    },

    {
      tableName: 'tag',
      timestamps: false
    }
  );
  Tag.associate = function (models) {};
  return Tag;
};
