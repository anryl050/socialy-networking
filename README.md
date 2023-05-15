![Badge](https://img.shields.io/badge/license-MIT-green?style=plastic&logo=appveyor)

# Socially Networking - Back-End API using Mongoose DB

## Table of Content
#### * [Project Desctiption](#description)
#### * [Demo Video](#video)
#### * [Installation/Technical Requirements](#installation)
#### * [Usage](#usage)
#### * [Tests](#tests)
#### * [License](#license)


## Project Description
The scope of the project is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. 

### User Story
- AS A social media startup
- I WANT an API for my social network that uses a NoSQL database
- SO THAT my website can handle large amounts of unstructured data


### Acceptance Criteria
GIVEN a social network API:

- WHEN I enter the command to invoke the application, THEN my server is started and the Mongoose models are synced to the MongoDB database.

- WHEN I open API GET routes in Insomnia for users and thoughts, THEN the data for each of these routes is displayed in a formatted JSON.

- WHEN I test API POST, PUT, and DELETE routes in Insomnia, THEN I am able to successfully create, update, and delete users and thoughts in my database.

- WHEN I test API POST and DELETE routes in Insomnia, THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list. 

## Demo Video
[Click here for video](https://github.com/anryl050/socialy-networking/assets/118693401/a18fe1c1-a530-4972-b379-19fbc4a99850)


## Installation/Technical Requirements
The can be deployed using Heroku services.

Technology used:
- Express.js for routing,
- MongoDB database,
- Mongoose ODM
- DayJs

## License
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
