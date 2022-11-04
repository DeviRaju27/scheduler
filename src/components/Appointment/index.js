import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import "components/Appointment/styles.scss"



export default function Appointment(props) {
  const interviewObj =  props.interview
  console.log("con", interviewObj)
  return (
    <article className='appointment'>
      <Header time={props.time}> </Header>

      { props.interview
        ?
        <>
        <Show  {...interviewObj}></Show> </>
        : 
        <>
        <Empty></Empty>
        </>
      }

    </article>
  )
}

