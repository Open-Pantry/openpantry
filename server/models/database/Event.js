module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      start_tm: DataTypes.DATE,
      end_tm: DataTypes.DATE
    },
    {
      tableName: 'event',
      timestamps: false
    }
  );
  Event.associate = (models) => {
    Event.hasMany(models.Tag, {
      as: 'eventTag',
      foreignKey: 'event_id',
      onDelete: 'cascade',
      hooks: 'true'
    });
  };
  return Event;
};
