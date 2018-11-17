module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'Organization',
    {
      name: DataTypes.STRING,
      location_name: DataTypes.TEXT,
      location_lat: DataTypes.STRING,
      location_long: DataTypes.STRING,
      description: DataTypes.TEXT,
      visibility: DataTypes.BOOLEAN,
      logo_name: DataTypes.STRING
    },
    {
      tableName: 'organization',
      timestamps: false
    }
  );
  Organization.associate = (models) => {
    Organization.hasMany(models.Account, {
      as: 'organizationAccount',
      foreignKey: 'organization_id',
      onDelete: 'cascade',
      hooks: 'true'
    });
    Organization.hasMany(models.Product, {
      as: 'organizationProduct',
      foreignKey: 'organization_id',
      onDelete: 'cascade',
      hooks: 'true'
    });
    Organization.hasMany(models.Tag, {
      as: 'organizationTag',
      foreignKey: 'organization_id',
      onDelete: 'cascade',
      hooks: 'true'
    });
    Organization.hasMany(models.Event, {
      as: 'organizationEvent',
      foreignKey: 'organization_id',
      onDelete: 'cascade',
      hooks: 'true'
    });
  };
  return Organization;
};
