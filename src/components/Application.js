import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {

//custom hook states and functions
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const dailyAppointments = getAppointmentsForDay(state, state.day)

  //Mapping through each day to get interview array and interviewers for the day
  const mappedAppointment = dailyAppointments.map(eachAppointment => {
    const interview = getInterview(state, eachAppointment.interview);
    const interviewersForDay = getInterviewersForDay(state, state.day)

    return (
      <Appointment
        id={eachAppointment.id}
        time={eachAppointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        key={eachAppointment.id}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview} />
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