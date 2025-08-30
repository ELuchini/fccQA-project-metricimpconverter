function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    if (!input || typeof input !== 'string') {
      //throw new Error('Invalid input: input must be a non-empty string');
      return null;
    }
    
    const numRegex = /^[\d.\/]+/;
    const match = input.match(numRegex);
    if (match) {
      const numStr = match[0];
      if (numStr.includes('/')) {
        const fractionParts = numStr.split('/');
        if (fractionParts.length === 2) {
          const numerator = parseFloat(fractionParts[0]);
          const denominator = parseFloat(fractionParts[1]);
          if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            result = numerator / denominator;
          } else {
            // throw new Error('Invalid number: fraction is not valid');
            return null;
          }
        } else {
          // throw new Error('Invalid number: multiple slashes in fraction');
          return null;
        }
      } else {
        const number = parseFloat(numStr);
        if (!isNaN(number)) {
          result = number;
        } else {
          // throw new Error('Invalid number: not a valid numeric value');
          return null;
        } 
      }
    } else {
      result = 1; 
    } 
    

    return result;
  };
  
  this.getUnit = function(input) {
    let result;

    if (!input || typeof input !== 'string') {
      // throw new Error('Invalid input: input must be a non-empty string');
      return null;
    }

    //console.log("ConvertHandler: " + input);
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (match) {
      //console.log("ConvertHandler \"if match\": " + match[0]);
      const unit = match[0].toLowerCase();
      const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']; 
      if (validUnits.includes(unit)) {
        result = unit === 'l' ? 'L' : unit; 
      } else {
        // throw new Error('Invalid unit: not a recognized unit');
        return null;
      }
    // } else {
    //   throw new Error('Invalid unit: no unit found in input');
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };

    result = unitMap[initUnit];

    if (!result) {
      throw new Error('Invalid unit: no return unit found');
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (typeof initNum !== 'number' || initNum <= 0) {
      throw new Error('Invalid number: must be a positive number');
    }

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        throw new Error('Invalid unit: conversion not supported');
    }

    // Round the result to 5 decimal places
    result = Math.round(result * 100000) / 100000;

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum == null || initUnit == null || returnNum == null || returnUnit == null) {
      throw new Error('Invalid input: missing required parameters');
    }

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };

    const result = unitMap[unit];

    if (!result) {
      throw new Error('Invalid unit: no spelled-out name found');
    }

    return result;
  };
}

module.exports = ConvertHandler;
