This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies
### `npm install`

* Make sure you have Node.js (LTS) installed on your machine. If not, please install that from [https://nodejs.org/en/](https://nodejs.org/en/).

## Setup

* Extract the zip file `neelK-aera.zip` to your local machine and navigate to `neelK-aera` folder.
* Run `npm install` from /neelK-aera to install all dependencies this project needs.

##` Please note` 
The application is not using any libraries like bootstrap or material-ui for styling. 
However @material-ui/core library is used just for enabling withStyles HOC. 

## Available Scripts

After all the dependencies are installed via `npm install`, you can run this in the project directory to start the application:

### `npm start`

Runs the app in the development mode and automatically opens a new browser tab at [http://localhost:3000](http://localhost:3000).<br>
If the port `3000` is used by some other application you may see a message prompting to use another port.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Features of the application
#### Data Display
* Data is read from the books API and rendered on home page in a cards format.
* The application is designed to display books filtered by list type. By default the app will show the books for the first list.
* Use the select box next to `selected category` to change list type.
* Clicking on a card will make the details overlay appear which will have more details about the book.
* To close the overlay card click anywhere on the viewport.





