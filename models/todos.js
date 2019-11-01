'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    userId: {
      type:DataTypes.INTEGER,
      validate: {
        isNumeric : true
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: "title must be atleast 3 characters in length"
        },
      }
    }, 
    description: DataTypes.STRING,
    dateActivity: {
      type :    DataTypes.DATEONLY,
      validate:{
        isDate : true
      }
    },
    completed: DataTypes.BOOLEAN
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};