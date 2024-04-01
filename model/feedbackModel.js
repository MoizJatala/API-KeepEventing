module.exports = (sequelize, DataTypes) => {

    const Feedback = sequelize.define("feedback", {
        discription: {
            type : DataTypes.STRING
        }
    
    })

    return Feedback

}