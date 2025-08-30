# AI Coding Agent Guidelines for Metric-Imperial Converter

Welcome to the Metric-Imperial Converter project! This document provides essential guidelines for AI coding agents to be productive in this codebase. Follow these instructions to understand the architecture, workflows, and conventions specific to this project.

## Project Overview
This project is a **Metric-Imperial Converter** built as part of the FreeCodeCamp Quality Assurance curriculum. It provides an API to convert between metric and imperial units. The project includes:

- **API Endpoints**: Located in `routes/api.js`, the `/api/convert` endpoint handles conversion requests.
- **Conversion Logic**: Encapsulated in `controllers/convertHandler.js`, which processes input, validates it, and performs unit conversions.
- **Frontend**: A simple interface in `views/index.html` for testing the API.
- **Tests**: Unit and functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.

## Key Files and Directories
- `server.js`: Entry point for the application. Configures routes and middleware.
- `controllers/convertHandler.js`: Core logic for parsing, validating, and converting units.
- `routes/api.js`: Defines the `/api/convert` endpoint.
- `tests/`: Contains unit and functional tests.
- `views/index.html`: Frontend interface for manual testing.

## Developer Workflows
### Running the Application
1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Access the app at `http://localhost:3000`

### Testing
- Run all tests: `npm test`
- Unit tests: Located in `tests/1_unit-tests.js`
- Functional tests: Located in `tests/2_functional-tests.js`

### Debugging
- Use `console.log` for debugging in `server.js` or `convertHandler.js`.
- Check the browser console for frontend issues.

## Project-Specific Conventions
- **Validation**: Input validation is handled in `convertHandler.js` using regex patterns.
- **Error Handling**: The `/api/convert` endpoint returns JSON errors for invalid inputs (e.g., `{error: 'invalid number'}`).
- **Rounding**: Conversion results are rounded to 5 decimal places in `convertHandler.js`.

## Examples
### API Usage
- Request: `/api/convert?input=4gal`
- Response: `{ initNum: 4, initUnit: 'gal', returnNum: 15.14165, returnUnit: 'L', string: '4 gallons converts to 15.14165 liters' }`

### Conversion Logic
- Input parsing: `getNum` and `getUnit` in `convertHandler.js`
- Conversion: `convert` method in `convertHandler.js`

## External Dependencies
- **jQuery**: Used in `views/index.html` for AJAX requests.
- **Node.js**: Backend runtime.

## Notes for AI Agents
- Focus on maintaining the modular structure of `convertHandler.js`.
- Ensure all new features or fixes are covered by tests in `tests/`.
- Follow the existing error-handling patterns in `server.js`.

For more details, refer to the [FreeCodeCamp project instructions](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter).
