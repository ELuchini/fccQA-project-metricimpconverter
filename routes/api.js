'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      //console.log("the input is: " + input);
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnUnit;
      let returnNum;
      let string; 
      if (initNum === null && initUnit === null) {
        return res.json({error: 'invalid number and unit'});
      } else if (initNum === null) {
        return res.json({error: 'invalid number'});
      } else if (initUnit === null) {
        return res.json({error: 'invalid unit'});
      } else {
        returnUnit = convertHandler.getReturnUnit(initUnit);
        returnNum = convertHandler.convert(initNum, initUnit);  
        returnNum = Math.round(returnNum * 100000) / 100000;
        string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      }
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      });
    });
};
