// Creating our Donation model
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    // Quantity donated
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Donation.associate = (models) => {
    Donation.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      as: 'product',
    });
  };

  return Donation;
};
