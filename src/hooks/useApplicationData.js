import { useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")

      ])
      .then((response) => {
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
      })

  }, []);

  //function to find index id of each day
  function idByWeekName(day) {
    const idOfDay = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return idOfDay[day]
  }
  //function to update the spots count for add/cancel appoinment function
  function calculateSpotsForDay(day, appointments) {
    let count = 0;

    day.appointments.forEach(appointmentId => {
      if (appointments[appointmentId].interview === null) {
        count += 1
      }
    })
    return count
  }

  //function to cancel an interview and reduce the spots count by 1
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
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

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days })
      })
  }

  //function to book an interview and increase the spots by 1
  function bookInterview(id, interview) {

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




