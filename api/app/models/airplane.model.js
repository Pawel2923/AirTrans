module.exports = (sequelize, Sequelize) => {
    const Airplane = sequelize.define("airplane", {
        Serial_no: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Model: {
            type: Sequelize.STRING
        },
        Type: {
            type: Sequelize.STRING
        },
        Production_year: {
            type: Sequelize.INTEGER
        },
        Num_of_seats: {
            type: Sequelize.INTEGER
        },
        Fuel_tank: {
            type: Sequelize.FLOAT
        },
        Fuel_quant: {
            type: Sequelize.FLOAT
        },
        Crew_size: {
            type: Sequelize.INTEGER
        },
        Max_cargo: {
            type: Sequelize.FLOAT
        }
    });
  
    return Airplane;
  };