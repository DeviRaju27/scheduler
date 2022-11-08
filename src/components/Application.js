import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";






export default function Application(props) {
 


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then( () => {
      setState({...state, appointments})
    })
    
  }

  function bookInterview(id, interview) {
    console.log("id from bookinterview",id);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState({ ...state, appointments })
    })
    .catch(e => console.log(e))
  }

  const setDay = day => setState({ ...state, day }); // prop to daylist

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")

      ])
      .then((response) => {
console.log("res",response)
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
      })
  }, []);



  
  const dailyAppointments = getAppointmentsForDay(state, state.day) 

  const mappedAppointment = dailyAppointments.map(eachAppointment => {

    const interview = getInterview(state, eachAppointment.interview);
    console.log("interview obj",interview)
    const interviewersForDay = getInterviewersForDay(state, state.day)

    return (
      <Appointment
       id = {eachAppointment.id}
       time = {eachAppointment.time}
       interview = {interview}
       interviewers = {interviewersForDay}
       key={eachAppointment.id} 
       bookInterview = { bookInterview }
       cancelInterview = { cancelInterview } />
    )
  });




  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            value={state.day}
            setDay={day => setDay(day)}
          />

        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {mappedAppointment}
        <Appointment key="last" time="5pm" />


      </section>
    </main>
  );
}
