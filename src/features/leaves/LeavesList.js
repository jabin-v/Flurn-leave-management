import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, fetchLeavesWithFilter, selectAllLeaves } from "./leavesSlice";
import Leave from "./Leave"
import DateRangePickerComp from "../../components/dateRangePicker/DateRangePickerComp";
import { addDays } from 'date-fns'
import { Link } from "react-router-dom";
const LeavesList = () => {
const dispatch = useDispatch();


  //before ceratain date


  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

 
 
 // date state
 const [range, setRange] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
])

  let isCancelled = false;
  useEffect(() => {
    if (!isCancelled) {
      dispatch(fetchLeaves());
    }

    return () => {
      isCancelled = true;
    };
  }, []);


  const leaves = useSelector(selectAllLeaves);

  const applyFilter=(filter)=>{

    if(filter==="6 month"){

      console.log(filter)
      
      const data=[{
        startDate:addMonths(new Date(), -6),
        endDate:new Date()
      }];

      dispatch(fetchLeavesWithFilter(data))


    }

    else if(filter === "1 year"){

      console.log(filter)
      
      const data=[{
        startDate:addMonths(new Date(), -12),
        endDate:new Date()
      }];

      dispatch(fetchLeavesWithFilter(data))

    }
    else if (filter === "reset"){

      dispatch(fetchLeaves());

    }
       
    else dispatch(fetchLeavesWithFilter(range))

  }

 


  const tableContent = leaves?.map(leave => <Leave key={leave.id} leaveId={leave.id} data={leave} />)

  let content = (
    <table className="table table--notes">
        <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th note__status">Leave Status</th>
                <th scope="col" className="table__th note__created">StartDate</th>
                <th scope="col" className="table__th note__updated">EndDate</th>
                <th scope="col" className="table__th note__title">Reason</th>
                <th scope="col" className="table__th note__username">Total Days</th>
                <th scope="col" className="table__th note__edit">Edit</th>
            </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </table>
)

return (
<>

<div className="filter-margin flex">
<p>Filter</p>
<div>
<DateRangePickerComp range={range} setRange={setRange}/>
</div>
<div >
    <span className="btn-filter" onClick={applyFilter}>FIlter</span>
    <span className="btn-filter green" onClick={()=>applyFilter("6 month")}>Last 6 Month</span>
    <span className="btn-filter" onClick={()=>applyFilter("1 year")}>Last 1 Year</span>
    <span className="btn-filter green" onClick={()=>applyFilter("reset")}>Reset</span>
    <Link to="/dash/leave/new" className="btn-filter green" onClick={()=>applyFilter("reset")}>Apply for a new Leave</Link>
    <Link to="/dash/visualize" className="btn-filter green" onClick={()=>applyFilter("reset")}>Show leaves in calender</Link>
    


</div>
</div>
    
    {!leaves ?"You are tooo commited to your job go and enjoy sometime with your fam!!" :content}

    </>)
};

export default LeavesList;
