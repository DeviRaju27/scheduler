import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import classNames from "classnames";


export default function InterviewerList(props){



const interviewersArray = props.interviewers

const mappedInterviewers = interviewersArray.map( eachInterviewer => ( <InterviewerListItem
name = {eachInterviewer.name}
avatar = {eachInterviewer.avatar}
selected = {eachInterviewer.id === props.value}
setInterviewer = {() => props.onChange(eachInterviewer.id)}
key = {eachInterviewer.id}
></InterviewerListItem>))



  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
       {mappedInterviewers}
      </ul>
    </section>
  );
}