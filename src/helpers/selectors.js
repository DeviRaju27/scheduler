export function getAppointmentsForDay(state, day) {
 
  let filteredDay = state.days.filter(d => d.name === day);
  let result = [];
  
   if(!filteredDay[0]){
      return [];
    }

 
  for(const dd of filteredDay[0].appointments)
  {
    const appointmentsArray = state.appointments[dd]
    result.push(appointmentsArray)  
  }
return result
}

export function getInterviewersForDay(state,day){

  let filteredInterviewer = state.days.filter(d => d.name == day)

  if(!filteredInterviewer) return [];

  let result = [];
  for(const ii of filteredInterviewer[0].interviewers){
    const interviewerArray = state.interviewers[ii]
    result.push(interviewerArray)
  }
  return result
}


export function getInterview(state, interview) {

  if(!interview) return null;

  let filteredInterviewer = {};
  const id = interview.interviewer;
  filteredInterviewer.student = interview.student
  filteredInterviewer.interviewer = state.interviewers[id];
  return filteredInterviewer;


}


