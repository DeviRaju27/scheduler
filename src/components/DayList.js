import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const daysArray = props.days;
  // const isArrayDays = Array.isArray(daysArray);

  const eachDayListItem =  
  daysArray.map( (day) => (
   <DayListItem  
   name = {day.name} 
   spots = {day.spots} 
   selected = {day.name === props.value } 
   setDay = {props.setDay} 
   key={day.id}/>
  ));
 
  return (
    <ul>
      {eachDayListItem}
    </ul>
  )
}