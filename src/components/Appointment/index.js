import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Error from './Error';
import Status from './Status';
import "components/Appointment/styles.scss"
import useVisualMode from 'hooks/useVisualMode';


export default function Appointment(props) {

  //Declare Mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  //custom hook 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  // function to cancel an appointment
  function cancel() {
    transition(DELETING, true)

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  //function to save an appointment with student name and interviewer name
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }


  return (
    <article className='appointment' data-testid="appointment">
      <Header time={props.time}> </Header>


      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW &&
        (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}

      {mode === CREATE &&
        (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={ back}

          />
        )}

      {mode === SAVING &&
        <Status message={"Saving"} />}

      {mode === CONFIRM &&
        (
          <Confirm
            onCancel={back}
            onConfirm={cancel}
            message="are you sure you wanna delete!?"
          />
        )}

      {mode === DELETING &&
        <Status message={"Deleting"} />}

      {mode === EDIT &&
        (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}

      {mode === ERROR_DELETE &&
        (
          <Error
            message={"error deleting appointment"}
            onClose={back}
          />
        )}

      {mode === ERROR_SAVE &&
        (
          <Error
            message={"error saving appointment"}
            onClose={back}
          />
        )}
    </article>
  )}

