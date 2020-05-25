# Trip Planner

## Introduction
A trip planner in overall keep track of individual trip records. It allows user to add/edit/delete trips and each trip has its own list of todo items. In addition, users can set a reminder date and time to remind themselves the details of trips.

## Code introduction
- `src/common`
	- `Constants.js` : enums for trip category, trip states and snooze options
	- `FakeServer.js` :  save and get trips from browser localstorage
	- `Todo.js` : Todo data model used in this app
	- `Trip.js` : Trip data model used in this app
- `src/components`
	- `filterPanel` : the left panel of the app. It contain filtering controls and a way to add and search trip items
	- `gridPanel` : the center of the app. It contains all trip records and allow users to select a trip for editing
	- `detailPanel` : the right panel of the app. It contains a set of form fields to allow a user to add a new trip, edit an existing trip and delete a trip.
	- `modal` : the reminder popup modal for a trip. It allows users to snooze or check detail of the trip
- `src/utils` : it contains some helper function like validating dates, calculating duration of days and filter trips

## Package dependencies
- React
- React Bootstrap
- React Datepicker
- Fontawesome
- uuid


## How to run the project
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
