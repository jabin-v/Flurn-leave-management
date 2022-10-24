import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, selectAllLeaves } from "./leavesSlice";
import Leave from "./Leave"

const LeavesList = () => {
  const dispatch = useDispatch();

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

return content
};

export default LeavesList;
