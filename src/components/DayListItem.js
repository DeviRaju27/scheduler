import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props){



  const dayclass = classNames("day-list__item",
  {
    "day-list__item--selected":props.selected,
    "day-list__item--full":props.spots===0
  });



  const formatSpots = (a) => {
    if(a === 0){
      return `no spots remaining`
    } else if(a === 1){
      return `${a} spot remaining`
    } else {
     return  `${a} spots remaining`
    }
  }

  return (
    <li className={dayclass} onClick = {() => props.setDay(props.name)} selected={props.selected}>
      <h2 >{props.name}</h2>
      <h3 className={dayclass}>{formatSpots(props.spots)}</h3>
    </li>
  )
}