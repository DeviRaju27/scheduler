import { useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  }); 
  // console.log("state.days from useappdata", state.days)

  const setDay = day => setState({ ...state, day }); 

useEffect(() => {
  Promise.all
    ([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")

    ])
    .then((response) => {
      // console.log("type from useeffect",typeof response[0].data)
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
    })
    
}, []);


function idByWeekName(day){

const idOfDay = {
  Monday : 0,
  Tuesday : 1,
  Wednesday : 2,
  Thursday : 3,
  Friday : 4
}
return idOfDay[day]
}

// console.log("huhuhu",idByWeekName("Monday"))


function cancelInterview(id){
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const dayId = idByWeekName(state.day)
  // console.log("state.day",state.day)
  // console.log("dayId",dayId)

  const singleday = {
    ...state.days[dayId],
    spots: calculateSpotsForDay(state.days[dayId], appointments)
  }

  let days = state.days
  days[dayId] = singleday


  return axios.delete(`/api/appointments/${id}`, appointment)
  .then( () => {
    setState({...state, appointments, days})
  })
}

function calculateSpotsForDay(day, appointments){
 let count = 0;

  day.appointments.forEach(appointmentId => {
    if(appointments[appointmentId].interview === null ){
      count +=1
    }
  })
  console.log("count", count)
  return count
}


function bookInterview(id, interview) {
  // console.log("id from bookinterview",id);

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const dayId = idByWeekName(state.day)


  const singleday = {
    ...state.days[dayId],
    spots: calculateSpotsForDay(state.days[dayId], appointments)
  }

  let days = state.days
  days[dayId] = singleday



  return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
  .then(() => {
    setState({ ...state, appointments, days })
  })
}

return { state, setDay, bookInterview, cancelInterview }

}

 


