# ![cf](https://i.imgur.com/7v5ASc8.png) Rest Insured

[![Coverage Status](https://coveralls.io/repos/github/MoneyCashNodes/RestInsured-API/badge.svg)](https://coveralls.io/github/MoneyCashNodes/RestInsured-API)
[![Build Status](https://travis-ci.org/MoneyCashNodes/RestInsured-API.svg?branch=master)](https://travis-ci.org/MoneyCashNodes/RestInsured-API)

Team Name: MoneyCacheNodes

[Abigail White](https://github.com/abswhite) | [Ben Ayzenberg](https://github.com/BAyzenberg) | [Enrique Rico](https://github.com/EnriqueRico) | [Kayla Asay](https://github.com/Kdasay16)
:----------------------------:|:----------------------------: | :------:| :------:
[![Abigail White](/assets/abigail.jpg)](https://github.com/abswhite) | [![Ben Ayzenberg](image)](https://github.com/BAyzenberg) | [![Enrique Rico](/assets/enrique.jpg)](https://github.com/EnriqueRico)|[![Kayla Asay ](/assets/kayla.jpg)](https://github.com/Kdasay16)

## About
"Rest Insured" is an iOS app that connects users with health care facilities based on their preferred location and health insurance provider. The code for iOS front-end development for the app can be viewed in the [Rest Insured](https://github.com/MoneyCashNodes/RestInsured) repository. This current repository provides the backend code for the application, created using JavaScript and Node.js.

This app is intended for **educational purposes** only. This project does not maintain user medical records with respect to health care needs or preferences. This app does not persist records of previous health care appointments or illness.

### Application Functionality
* Connect users with medical facilities that accept their insurance, based on user input of location and insurance provider.
* Utilize registered user functionality to access app functionality

### Structure
* This app was structured using MVC (Model-View-Controller) architecture.
* This project is deployed on Heroku using staging and production environments.
* The primary resources utilized in this project are Node.js, Mongo DB, Mocha/ Chai, and Express Middleware.
-------
## Summary
### MVP
* Registered user takes in full name, email, location, provider, password info
  * Password hashed so the password is never stored in plain text
* Input of provider info and location
  * User location
  * Range of query
  * Insurance provider name
* Output of medical institutions (dental, pharmacy, doctors) that accept insurance.
  * Visualization: interactive pins on a map AND listed information beneath map
* Provided info includes:
  * Doctor
  * Phone number
  * Name
  * Practice
  * Practice name
  * Insurance providers accepted (list)
  * Practice phone number
  * Specialty
  * Location

### Future Opportunities
* Filter requests to api by “specialty”
* Book appointments functionality
* Calendar notifications of appointment
* Unregistered user functionality to access query and map functionality

### Resources
* [BetterDoctor API](https://developer.betterdoctor.com/): Retrieve insurance information
* [Mongo DataBase](https://www.mongodb.com/): Maintain user registration data
* [Heroku](https://www.heroku.com): Deployment (Staging and Production Environments)
* [Express](https://expressjs.com/): Middleware functionality
* [Mongoose](http://mongoosejs.com/): Manage asynchronous environment
* [JSON Web Token](https://jwt.io/introduction/): Secure data transmission
* [Bluebird](https://www.npmjs.com/package/bluebird): Promise rendering
* [Body parser](https://www.npmjs.com/package/body-parser-json): Middleware development
* [Debug](https://www.npmjs.com/package/debug): Debugging code process
* [Cors](https://www.npmjs.com/package/cors): Provides Express middleware
* [Error Handler](https://www.npmjs.com/package/error-handler): Create error status
* [Multer](https://www.npmjs.com/package/multer): Handle middleware form data
* [Bcrypt](https://www.npmjs.com/package/bcrypt): Utilized in password hashing processes
* [Request](https://www.npmjs.com/package/request): Utilized in making http calls
* [Request-Promise](https://www.npmjs.com/package/request-promise): Utilize Request and Bluebird in making http calls

* Developer only:
  * [Mocha](https://www.npmjs.com/package/mocha): Testing
  * [Chai](https://www.npmjs.com/package/chai): Testing assertions
  * [Chai-http](http://chaijs.com/): Testing with local server environment

### Team Collaboration Tools
  * GitHub Projects/ Organization
  * Google Docs for larger overview, daily stand-ups
  * Slack for basic communication
_____
## API Endpoints
Deployed endpoint: `https://rest-insured-production.herokuapp.com`

Note: Application requests will be unsuccessful without essential environment variables.

### Install Node Packages
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `nodemon server`.

### Create and Modify User
Enter into terminal window:
1. Create Account:
  * Template: `http POST https://rest-insured-production.herokuapp.com/signup <fullName>=<input> <email>=<input> <password>=<input> <insurance>=<input>`
  * Example: `http POST https://rest-insured-production.herokuapp.com/api/signin fullName=abigail email=abs@white.com password=1234 insurance=aetna`
2. Fetch Account:
  * Template: `http GET https://rest-insured-production.herokuapp.com/signin -a <email>:<password>`
  * Example: `http GET https://rest-insured-production.herokuapp.com/api/signin -a abswhite:1234`
3. Update Account:
  * Template: `http PUT https://rest-insured-production.herokuapp.com/update/<user-id> <key>:<changed value> 'Authorization:Bearer <token>'`
  * Example: `http PUT https://rest-insured-production.herokuapp.com/update/1093982398738957329857 <fullName>:<abbi> 'Authorization:Bearer <token>'`
4. Delete Account:  
  * Template: `http DELETE https://rest-insured-production.herokuapp.com/delete/<user-id> 'Authorization:Bearer <token>'`
  * Example: `http DELETE https://rest-insured-production.herokuapp.com/update/1093982398738957329857 'Authorization:Bearer <token>'`

### Doctor and Practice Retrieval
* Further documentation found at [Better Doctor API:](https://developer.betterdoctor.com/documentation15)
* Utilize `http://api.betterdoctor.com` as basis for request endpoints.

Fetch provider information based on Location and Insurance Provider input.

API URL Request Retrieved from External API:
```
http GET https://api.betterdoctor.com/2016-03-01/doctors?insurance_uid=${req.query.insurance}&location=${req.query.lat}%2C${req.query.lon}%2C${req.query.range}&limit=5&user_key=${process.env.user_key}
```

API URL Sent to iOS Front-End (example):
```
http GET https://rest-insured-staging.herokuapp.com/ext/doctors?lat=47.606&lon=-122.332&range=10&insurance=regenceblueshieldofwashinton-regencewapreferredprovidernetwork 'Authorization:Bearer <token>'
```

#### Sample JSON Data Output
Example of data output from API request
```
{
  "Providers": [
    {
      "Practice" : {
        "Name" : "Good Doctors",
        "phone" : "1111111111",
        "uid" : "1234uiid576851234",
        "lat" : 47.635867,
        "long" : -122.281694,
        "state": "WA",
        "state_long": "Washington",
        "street": "821 Saint Helena Hwy S",
        "zip": "98116",
        "accepts_new_patients": true,
        "Doctors" : [
          {
            "Doctor Name" : "Adam Scott",
            "Specialty" : "cardiologist"
          }
        ]
      }
    }
  ]
}
```
### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### Acknowledgments

Thank you to Adam Wallraff, Scott Schmidt, Thomas Martinez, Devon Hackley, and Erica Winberry for guidance and assistance throughout the project.
