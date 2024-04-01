module.exports = (sequelize, DataTypes) => {

    const Registered = sequelize.define("registered", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        CNIC: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: { 
                   args: [7, 42],
                   msg: "The password length should be between 7 and 42 characters."
                }
             }
        }        
    
        
        
    
    })

    return Registered

}