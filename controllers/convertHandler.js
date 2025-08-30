function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
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
            result = null; 
          }
        } else {
          result = null; 
        }
      } else {
        const number = parseFloat(numStr);
        if (!isNaN(number)) {
          result = number;
        } else {
          result = null; 
        } 
      }
    } else {
      result = 1; 
    } 
    

    return result;
  };
  
  this.getUnit = function(input) {
    let result;

    console.log("ConvertHandler: " + input);
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (match) {
      console.log("ConvertHandler \"if match\": " + match[0]);
      const unit = match[0].toLowerCase();
      const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']; 
      if (validUnits.includes(unit)) {
        result = unit === 'l' ? 'L' : unit; 
      } else {
        result = null; 
      }
    }


    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    if (initUnit === 'gal') {
      result = 'L';
    } else if (initUnit === 'L') {
      result = 'gal';
    } else if (initUnit === 'lbs') {
      result = 'kg';
    } else if (initUnit === 'kg') {
      result = 'lbs';
    } else if (initUnit === 'mi') {
      result = 'km';
    } else if (initUnit === 'km') {
      result = 'mi';
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if (unit === 'gal') {
      result = 'gallons';
    } else if (unit === 'L') {
      result = 'liters';
    } else if (unit === 'lbs') {
      result = 'pounds';
    } else if (unit === 'kg') {
      result = 'kilograms';
    } else if (unit === 'mi') {
      result = 'miles';
    } else if (unit === 'km') {
      result = 'kilometers';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === 'gal') {
      result = initNum * galToL;
    } else if (initUnit === 'L') {
      result = initNum / galToL;
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    } else if (initUnit === 'mi') {
      result = initNum * miToKm;
    } else if (initUnit === 'km') {
      result = initNum / miToKm;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (initNum == null && initUnit == null) {
      result = 'invalid number and unit';
    } else if (initNum == null) {
      result = 'invalid number';
    } else if (initUnit == null) {
      result = 'invalid unit';
    } else {
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
