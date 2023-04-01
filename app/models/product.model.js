module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        }
    });
    return Product;
};