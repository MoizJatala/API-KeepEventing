module.exports = (sequelize, DataTypes) => {

    const Salon = sequelize.define("salon", {
        salon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        persons: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    
    })

    return Salon

}