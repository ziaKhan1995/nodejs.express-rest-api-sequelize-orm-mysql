module.exports=(sequelize,Sequelize)=>{
    const Customer=sequelize.define("Customer",{
        fname:{
            type:Sequelize.STRING
        },
        lname:{
            type:Sequelize.STRING
        },
        address:{
            type:Sequelize.STRING
        },
        contactNo:{
            type:Sequelize.STRING
        },
        status:{
            type:Sequelize.STRING
        }
    });

    return Customer;
};