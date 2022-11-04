import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


const Form = (props) => {

const [formStudent, SetformStudent] = useState(props.student || "");
const [formInterviewer, SetformInterviewer] = useState(props.interviewer || null);

const reset = () => {
 SetformStudent("")
 SetformInterviewer(null)

}
const cancel = () => {
  reset()
  props.onCancel()
}


  return (
    <main className="appointment__card appointment__card--create">

    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value = {formStudent}
          onChange = {(e)=>SetformStudent(e.target.value)}
          onSubmit={e => e.preventDefault()}
          /*
            This must be a controlled component
            your code goes here
          */
        />
      </form>
      <InterviewerList 
      interviewers = {props.interviewers} 
      value = {formInterviewer}
      onChange = {SetformInterviewer}/> 
    </section>
    
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick = {() => cancel()}>Cancel</Button>
        <Button confirm onClick = {props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  )
}

export default Form