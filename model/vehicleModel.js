module.exports = (sequelize, DataTypes) => {

    const Vehicle = sequelize.define("vehicle", {
        car: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.TIME
        },
        driver: {
            type: DataTypes.BOOLEAN
        },
        image: {
            type: DataTypes.STRING
        }
    
    })

    return Vehicle

}