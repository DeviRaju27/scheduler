export function getAppointmentsForDay(state, day) {
 

  let filteredDay = state.days.filter(d => d.name === day);
  
   if(!filteredDay[0]){
      return [];
    }

  let result = [];
  for(const dd of filteredDay[0].appointments){
    const appointmentsArray = state.appointments[dd]
    result.push(appointmentsArray)
    
  }
return result
}
