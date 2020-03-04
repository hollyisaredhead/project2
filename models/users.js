module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,

            allowNull: false,

            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,

            allowNull: false,

            validate: {
                isEmail: true
            }
        },
        pass: {
            type: DataTypes.STRING,

            allowNull: false,

            validate: {
                len: [1]
            }
        },
        role: {
            type: DataTypes.STRING,

            allowNull: false
        }
    });
    return Users;
};