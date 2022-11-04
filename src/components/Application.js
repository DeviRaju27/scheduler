import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day }); // prop to daylist

  useEffect(() => {
    Promise.all
      ([
        axios
          .get("/api/days"),
        axios
          .get("/api/appointments")
      ])
      .then((response) => {

        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data }))
        //  setDays(response.data)
      })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day) 
  const mappedAppointment = dailyAppointments.map(eachAppointment => (
    <Appointment {...eachAppointment} key={eachAppointment.id} />
  ))

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
