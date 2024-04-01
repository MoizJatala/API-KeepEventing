module.exports = (sequelize, DataTypes) => {

    const Hall = sequelize.define("hall", {
        hall: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.TIME
        },
        persons: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        }
    
    })

    return Hall

}