# ZEF ENERGY EZ ONBOARDING

## Description
Duration: 1 Month Project

ZEF ENERGY EZ ONBOARDING (ZEEO) was worked on over the course of a month, and can be split into two part: one week was spent planning and designing the application. While the last three weeks were spent building and testing the app. 

Our client Zef Energy approached us to fix their "new client onboarding process" with one main problem, the ticket-based system. Their former system was very complex, and customers didn't submit all the necessary information required for signup. This led to Zef Energy needing to have multiple interaction with clients that cost hundreds of dollars per client when signing up. Creating a frustration experience for both the client and Zef. 

Our application ZEEO fixed the above problems by creating a step by step experience for the client to follow and submit all the necessary information needed which we then collected and sent as an email to Zef. Reducing the need for multiple interactions and creating a better experience for both parties.

To see the fully functional site, please visit: DEPLOYED VERSION OF APP

### Prerequisites
Link to software that is required to install the app (e.g. node).

[VSCode] (https://code.visualstudio.com/download)
[Node.js](https://nodejs.org/en/)
[PostrgeSQL](https://www.postgresql.org/)
[Nodemon](https://nodemon.io/)
[JavaScript]
[React]

## Usage
How does someone use this application? Tell a user story here.

- A client will register an account
- Then they will be guided to create an Organization
- They will then be able to press on either "Add a device" or "Add a User"

- On the "Add a Device" path they will be shown a screen that will prep them with all the info needed to add a device
- The client will then input the gathered info on the next four screens
- Then a review page will populate with the info added before finally adding it to their organization.
- This process can be repeated as many times as needed for the organization

- On the "Add a User" path they will see a table of all current users in their organization (including the initial user)
- They can add a new user by simply filling the input fields beneath the table
- This process can be repeated as many times as needed for the organization

- Once finished adding atleast one device the "Review and Submit" path will open up and they can view all "device" and "user" information.
- Once reviewed, press submit
- You will see a page that says your information as been successfully sent. 

Built With:
- JavaScript
- React
- Postgresql
- Node
- Express
- HTML/CSS
- Material UI
- mailer.js

## ScreenShots

![HomeScreen](/images/homeScreen.jpeg)
![devicePrep](/images/devicePrep.png)
![reviewPage](/images/reviewPage.png)

## Installation
If your application has secret keys (for example -- Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the .env file.

Create a database named your ez_onboard,
The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
Open up your editor of choice and run an npm install
Run `npm run server` in your terminal
Run `npm run client` in your terminal
The npm run client command will open up a new browser tab for you!
Otherwise it is running on `localhost:3000`

### Mailer.js
You will need to create a file called `mailer.js` and populate with the info below: 
            
                            module.exports = {
                                USER: 'yourEmail exclude the `@` and everything after',
                                PASS: 'password'
                            }

This file is already in your `.gitignore`
This will only work with Gmail

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## License
MIT Copyright (c) 2020 Amir Mussa, Ace Fox, Robert Johnson

Note, include this only if you have a license file. GitHub will generate one for you if you want!

## Acknowledgement
Zef Energy for giving us the opportunity to employ or new skills and create this application.
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality. 
Special shout out to Amir, Ace, and Rob for the hardwork put into the project.