![cf](https://i.imgur.com/7v5ASc8.png) Rest Insured
#### Project Week May 2017
Team Name: MoneyCacheNodes
* JavaScript Team Members: Abigail White, Enrique Rico, Kayla Asay, Ben Ayzenberg
* iOS Team Members: Brandon Little, Luay Younus, David Porter

### Project Concept:
* Connect users with medical facilities that accept their insurance, based on user input of location and insurance provider.
* Utilize registered user functionality to access app functionality

### MVP
* Registered user takes in full name, email, location, provider, password info
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

### Stretch
* Filter requests to api by “specialty”
* Book appointments functionality
* Calendar notifications of appointment
* Unregistered user functionality to access query and map functionality

#### Resources
  * BetterDoctor api
  * Mongo DB
  * Heroku deployment
  * Express
  * Mongoose
  * JSON web token
  * Bluebird
  * Body parser
  * Debug
  * Cors

* Developer only: mocha, chai, chai-http


#### Collaboration Tools
  * GitHub Projects for daily TODOs
  * Google Docs for larger overview, daily standups
  * Slack for basic communication
_____
### Sample JSON
{
  "Providers": [
    {
      "Practice" : {
        "Name" : "Good Doctors",
        "phone" : "2064324567",
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
      },
      "Practice" : {
        "Name" : "Okay Doctors",
        "phone" : "4046304231",
        "uid" : "1234uiid5768674",
        "lat" : 47.609255,
        "long" : -122.334566,
        "state": "WA",
        "state_long": "Washington",
        "street": "600 Helena Hwy S",
        "zip": "98116",
        "accepts_new_patients": true,
        "Doctors" : [
          {
            "Doctor Name" : "Brandon Luay",
            "Specialty" : "dermotologist"
          }
        ]
      },
      "Practice" : {
        "Name" : "Bad Doctors",
        "phone" : "2066304231",
        "uid" : "1234uiid576854048",
        "lat" : 47.622910,
        "long" : -122.326841,
        "state": "WA",
        "state_long": "Washington",
        "street": "821 Mount Rainier Hwy S",
        "zip": "98116",
        "accepts_new_patients": true,
        "Doctors" : [
          {
            "Doctor Name" : "David Porter",
            "Specialty" : "proctologist"
          }
        ]
      }
    }
  ]
}
