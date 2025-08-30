const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('convertHandler should correctly read a whole number input.', function() {
    const input = '32L';
    const result = convertHandler.getNum(input);
    assert.strictEqual(result, 32, 'The number should be correctly read as 32');
  });

  test('convertHandler should correctly read a decimal number input.', function() {
    const input = '32.5L';
    const result = convertHandler.getNum(input);
    assert.strictEqual(result, 32.5, 'The number should be correctly read as 32.5');
  });

  test('convertHandler should correctly read a fractional input.', function() {
    const input = '1/2L';
    const result = convertHandler.getNum(input);
    assert.strictEqual(result, 0.5, 'The number should be correctly read as 0.5');
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function() {
    const input = '1.5/2L';
    const result = convertHandler.getNum(input);
    assert.strictEqual(result, 0.75, 'The number should be correctly read as 0.75');
  });

  /* test('convertHandler should correctly return an error on a double fraction', function(done) {
    const input = '1/2/3L';
    //console.log("The result for a double fraction is: " + convertHandler.getNum(input));
    assert.isNull(() => convertHandler.getNum(input) , Error, 'Invalid number: multiple slashes in fraction', 'The result should return an error for a double fraction');
    done();
  });
 */

   test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(done) {
    const input = '1/2/3L';
    const result = convertHandler.getNum(input);
    //console.log("The result for a double fraction is: " + convertHandler.getNum(input));
    assert.isNull(result, 'The result should return null for a double fraction');
    done();
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
    const input = 'Kg';
    const result = convertHandler.getNum(input);
    assert.strictEqual(result, 1, 'The number should default to 1');
  });

  test('convertHandler should correctly read each valid input unit.', function() {
    const inputUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    const expectedUnits = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
    inputUnits.forEach((unit, index) => {
      const result = convertHandler.getUnit('32' + unit);
      assert.strictEqual(result, expectedUnits[index], `The unit ${unit} should be correctly read as ${expectedUnits[index]}`);
    });
  });

    /* test('convertHandler should correctly return an error for an invalid input unit', function() {
        const input = '32g';
        assert.throw(() => { convertHandler.getUnit(input) }, Error, 'Invalid unit: not a recognized unit', 'The result should return an error for an invalid unit');
    }); */

    test('convertHandler should correctly return an error for an invalid input unit.', function() {
        const input = '32g';
        const result = convertHandler.getUnit(input);
        assert.isNull(result, 'The result should return an error for an invalid unit');
    });

    test('convertHandler should return the correct return unit for each valid input unit.', function() {
    const inputUnits = ['gal','l','mi','km','lbs','kg'];
    const expectedReturnUnits = ['L','gal','km','mi','kg','lbs'];
    inputUnits.forEach((unit, index) => {
      const fromGetUnit = convertHandler.getUnit(unit);
      //console.log(`The unit from getUnit for ${unit} is: ${fromGetUnit}`);
      const result = convertHandler.getReturnUnit(fromGetUnit);
      assert.strictEqual(result, expectedReturnUnits[index], `The return unit for ${unit} should be ${expectedReturnUnits[index]}`);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
    const inputUnits = ['gal','l','mi','km','lbs','kg'];
    const expectedSpelledOutUnits = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    inputUnits.forEach((unit, index) => {
      const result = convertHandler.spellOutUnit(convertHandler.getUnit(unit));
      //console.log(`The spelled-out unit for ${unit} is: ${result}`);
      assert.strictEqual(result, expectedSpelledOutUnits[index], `The spelled-out unit for ${unit} should be ${expectedSpelledOutUnits[index]}`);
    });
  });

  test('convertHandler should correctly convert gal to L.', function() {
    const input = 5;
    const unit = 'gal';
    const expected = 18.9271;
    const result = convertHandler.convert(input, unit);
    assert.approximately(result, expected, 0.1, '5 gallons should convert to approximately 18.9271 liters');
  });

    test('convertHandler should correctly convert L to gal.', function() {
    const input = 5;
    const unit = 'L';
    const expected = 1.32086;
    const result = convertHandler.convert(input, unit);
    assert.approximately(result, expected, 0.1, '5 liters should convert to approximately 1.32086 gallons');
  });

    test('convertHandler should correctly convert mi to km.', function() {
    const input = 5;
    const unit = 'mi';
    const expected = 8.0467;
    const result = convertHandler.convert(input, unit);
    assert.approximately(result, expected, 0.1, '5 miles should convert to approximately 8.0467 kilometers');
  });

    test('convertHandler should correctly convert km to mi.', function() {
    const input = 5;
    const unit = 'km';
    const expected = 3.10686;
    const result = convertHandler.convert(input, unit);
    assert.approximately(result, expected, 0.1, '5 kilometers should convert to approximately 3.10686 miles');
    });

    test('convertHandler should correctly convert lbs to kg.', function() {
    const input = 5;
    const unit = 'lbs';
    const expected = 2.26796;
    const result = convertHandler.convert(input, unit);
    assert.approximately(result, expected, 0.1, '5 pounds should convert to approximately 2.26796 kilograms');
  });

    test('convertHandler should correctly convert kg to lbs.', function() {
    const input = 5;
    const unit = 'kg';
    const expected = 11.0231;
    const result = convertHandler.convert(input, unit);
    assert.approximately(result, expected, 0.1, '5 kilograms should convert to approximately 11.0231 pounds');
  });  

});