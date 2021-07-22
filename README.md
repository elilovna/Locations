# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## About

The main goal of the project was to solve the issue of people not visiting unpopular places in California state. In order to do that, an application was made to provide an overview of different beaches in the area. 

The application meets a user with a Map and a List. The Map provides an easy access to different places based on the area, while the List shows the relevant pictures and a very basic info. Upon a click on either of them, the user is taken to a detailed view, presenting the additional info available in the API. The detailed view is opened in a new tab to prevent user from losing the context of the search they've done. 

To make the discovery more convenient, a filter controller was added at the top. The user can chose the facilities which of an interest to them, and filter the places. Once one filter is selected, all the places not containing the facility will be hidden from the results.

The project was developed in a desktop-first manner, nevertheless support for the mobile size was added. For convenience, the mobile presentation contains a standard Navigation-Tab based approach. 

## Technical 

In order to improve the loading of the map, only the visible part of the pins was decided to be loaded. google-map-react provided a convenient way to check if the given location is in the bounds of the selected area. Once this is set up, the selected area (hence filtering) is done on every map change (zoom/drag)

For the application to work properly, a production key should be added for the map (find by TODO mark)


## Future steps

Based on the limited time, only a set of features was chosen for the development. Farther, a search by location can be added, the UI can be improved in a lot of ways, along with the UX of mobile.
