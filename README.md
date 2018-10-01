# birding-hotspots
GWG Udacity Fend Project #7

# Neighborhood Map (REACT) Project: Birding Hotspots

This is a React App that provides an interactive guide to good birding spots on the central Oregon Coast.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Running](#running)
* [Attribution](#attribution)
* [Acknowledgements](#acknowledgements)


## Features

- Presentation and Display
  - Interactive Google Map.
  - Pre-defined locations/attractions.
  - Attraction and address information displayed via an InfoWindow.


- Navigation
  - Location information can be selected by clicking on the 'Arrow' markers above each location.
  - Location information can also be selected from the list on the left of the screen.
  - Locations can be "filtered" using the searchbox 'Search Good Birding Spots' on the left.

- API
  - Google Maps API is used for Map and location markers
  - FourSquare Venues API is used for additional location information.

## Installation

Download all the files to your local machine.
```
git clone https://github.com/gerkill/birding-hotspots or downloas as zip.
In the command line, cd birding-hotspots
yarn install or npm install
```

## Running

Start a local development Web Server via:
```
  yarn start or npm start
```
Your browser should open automatically and display the App.
If your browser does not start automatically, open your browser and connect to: ```http://localhost:3000```

The service worker with the create-react-app only works in the *production build*, not in the development mode.
To run the app in production use the following commands:
```
npm run build
serve -s build
```
Then go to
```
localhost:5000
```

or with yarn use:
```
yarn build
yarn global add serve
serve -s build
```



## Attribution

-Google Maps API<br>
-FourSquare Venues API

## Acknowledgements

* [Resources, advice and help from fellow Udacity students and mentors](https://www.diigo.com/outliner/fkkuvb/Udacity-Neighborhood-Map-Project-(project-%237)?key=25wgqnwals)
* [Learn React - React Crash Course 2018 - React Tutorial with Examples by Mosh Hamedani](https://youtu.be/Ke90Tje7VS0)
* [Learning React: A Hands-On Guide to Building Web Applications Using React and Redux, by Kirupa Chinnathambi, 2nd Edition](https://www.amazon.com/Learning-React-Hands-Building-Applications/dp/013484355X/ref=sr_1_4?ie=UTF8&qid=1537308172&sr=8-4&keywords=learning+react)
* [Google Maps: Power Tools for Maximizing the API by Evangelos Petroutsos](https://www.amazon.com/gp/product/0071823026/ref=dbs_a_def_rwt_bibl_vppi_i0)
