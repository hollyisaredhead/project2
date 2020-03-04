module.exports = function (sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        user: {
            type: DataTypes.STRING,

            allowNull: false,

            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.STRING,

            allowNull: false,

            validate: {
                len: [1]
            }
        },
        sectionId: {
            type: DataTypes.STRING,

            allowNull: false
        }
    });
    return Comments;
};