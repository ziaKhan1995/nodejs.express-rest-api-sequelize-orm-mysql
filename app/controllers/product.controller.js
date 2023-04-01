const db = require("../models");
const Products = db.products;

const Operator = db.Sequelize.Op;

const create = (req, res) => {

    if (!req.body.name) {
        let errObj = {
            message: "Product name Shoul not be empty"
        };
        res.status(400).send(errObj);
        return;
    }
    let product = {
        name: req.body.name,
        company: req.body.company,
        category: req.body.category
    };
    Products.create(product).then(data => {
        return res.send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "unable to get all custoomers"
        });
    });

};
module.exports.create = create;

const findAll = (req, res) => {
    var name = "";
    if (req.query.name) {
        name = req.query.name;
    }
    var whereClause = name ? { [Operator.like]: `${name}` } : null;
    var whereCondition = { where: whereClause };
    Products.findAll(whereCondition).then(data => {
        return res.send(data)
    }).catch(error => {
        return res.status(500).send({
            message: error.message || "An error occureed while getting the products"
        });
    });
};
module.exports.findAll = findAll;