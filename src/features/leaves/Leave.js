import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { memo } from 'react'


const Leave = ({ leaveId,data }) => {

const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

// Example
const days=getDaysDiffBetweenDates(new Date(data.start_date), new Date(data.end_date)); // 9









    const navigate = useNavigate()

    
        // const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/dash/${leaveId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                     {new Date(data.end_date).getTime()<=new Date().getTime()
                        ? 
                         <span className="note__status--completed">Completed</span>
                         : <span className="note__status--open">Open</span>
                     }
                </td>
                <td className="table__cell note__created">{data.start_date}</td>
                <td className="table__cell note__updated">{data.end_date}</td>
                <td className="table__cell note__title">{data.reason ? data.reason : "No reason Provided"}</td>
                <td className="table__cell note__username">{days+1}</td>

                <td className="table__cell">
                    
                         {new Date(data.end_date).getTime()>=new Date().getTime() ?
                            <button
                            className="icon-button table__button"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button> :""
                    }
                   
                </td>
            </tr>
        )

    
}

const memoizedLeave = memo(Leave)

export default memoizedLeave