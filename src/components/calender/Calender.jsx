import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { selectAllLeaves } from '../../features/leaves/leavesSlice';
const localizer = momentLocalizer(moment);



const Calender = () => {


    const leaves = useSelector(selectAllLeaves);

    console.log(leaves)
   

  return (
    <div>
        <Calendar
            events={leaves}
            startAccessor="start_date"
            endAccessor="end_date"
            titleAccessor="reason"
            defaultDate={moment().toDate()}
            localizer={localizer}
            style={{ height: 500 }}
          />
    </div>
  )
}

export default Calender