const { ValidationError } = require("sequelize");

module.exports = {
    ValidationError: require('./validation-error'),
    AppError: require('./app-error'),
    ServiceError: require('./service-error')
}