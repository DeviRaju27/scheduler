import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import PropTypes from 'prop-types';

const Form = (props) => {

  const [formStudent, SetformStudent] = useState(props.student || "");
  const [formInterviewer, SetformInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    SetformStudent("")
    SetformInterviewer(null)

  }
  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate() {
   

    if (formStudent === "") {
      setError("student name cannot be blank");
      return;
    }
    if (formInterviewer === null) {
      setError("please select an interviewer");
      return;
    }
    setError('');
    props.onSave(formStudent, formInterviewer);
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
            value={formStudent}
            onChange={(e) => SetformStudent(e.target.value)}
            onSubmit={e => e.preventDefault()}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">
            {error}
          </section>
        </form>



        <InterviewerList
          interviewers={props.interviewers}
          value={formInterviewer}
          onChange={SetformInterviewer} />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
          {/* <Button confirm onClick={() => props.onSave(formStudent, formInterviewer)}>Save</Button> */}
        </section>
      </section>
    </main>
  )
}

Form.propTypes = {
  student : PropTypes.string
};

export default Form