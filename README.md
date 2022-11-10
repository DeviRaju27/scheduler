# __Interview Scheduler__

Interview Scheduler is a Single Page Application built 
using React's latest tools and techniques that allows users to book, edit and cancel interviews. We combine a concise API with Websocket to build a realtime experience

-----------------------------------------
## __Project Stack__

Front-end : React, HTML, SASS, JavaScript, JSX, Axios

Back-end: Node.js, PostgreSQL(RDBMS)

--------------------------

## __Setup__

Install dependencies with `npm install`.

### Tools
  
- ### webpack-dev-server
 to run your entire application in development mode

```sh
npm start
```

- ####  Jest Test Framework

to run unit or integration tests from the command line
```sh
npm test
```

- #### Storybook

manually test your components in isolation
```sh 
npm run storybook
```
- #### Cypress

to run automated end-to-end tests in the browser
```sh
npm run cypress

```

------------------------------

## __Features__

- Appointment Days (Monday to Friday) are listed on the left side bar with the remaining availabilty/spots, which gets updated after booking or cancellation
- Main page contains available spots, each day has 5 spots,  starting from 12PM to 4PM
- User can switch between days and see detailed information
- Booked Interviews are displayed with the student name and interviewer name
- Empty slots are displayed with an Add button for user to book new interviews
- Booked interviews can be edited or deleted if needed
- Delete option has confirmation message before deleting the data
--------------------

## __Screenshots__

![Home-Page](https://github.com/DeviRaju27/scheduler/blob/master/docs/Home-page.png)
![Add/Edit Page](https://github.com/DeviRaju27/scheduler/blob/master/docs/Add:Edit%20page.png)
![Delete Page](https://github.com/DeviRaju27/scheduler/blob/master/docs/Delete-page.png)