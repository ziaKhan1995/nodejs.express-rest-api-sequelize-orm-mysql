const db = require("../models");
const Editors = db.editors;
const Operator = db.Sequelize.Op;

//create and save new editor

exports.create = (req, res) => {
    if (!req.body.fname || !req.body.lname) {
        res.status(400).send({
            message: "Name Should not be null"
        });
        return;
    }
    const Editor = {
        fname: req.body.fname,
        lname: req.body.lname,
        contactNo: req.body.contactNo,
        address: req.body.address,
        status: req.body.status
    };
    Editors.create(Editor).then((data) => {
        console.log("Editors data");
        return res.send(data);
    })
        .catch((err) => {
            console.log("Editors err");
            return res.status(500).send({
                message: err.message || "Am error occured while creating Editor"
            });
        });

};

const findAll = (req, res) => {
    var fname = req.query.fname;
    var whereVlause = fname ? { [Operator.like]: `${fname}` } : null;
    Editors.findAll({ where: whereVlause }).then((data) => {
        return res.send(data)
    }).catch((error) => {
        return res.status(500).send({
            message: error.message || "An error occurred while retreiving editrs. Please try later"
        });
    });

};
module.exports.findAll=findAll;