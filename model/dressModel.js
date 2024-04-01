module.exports = (sequelize, DataTypes) => {

    const Dress = sequelize.define("dress", {
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    
    })

    return Dress

}