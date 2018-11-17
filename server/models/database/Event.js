module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE
    },
    {
      tableName: 'event',
      timestamps: true
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
