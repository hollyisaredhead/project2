module.exports = function (sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        user: {
            type: DataTypes.STRING,

            allowNull: false
        },
        body: {
            type: DataTypes.STRING,

            allowNull: false
        },
        sectionId: {
            type: DataTypes.STRING,

            allowNull: false
        }
    });
    return Comments;
};