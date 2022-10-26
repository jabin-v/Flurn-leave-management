import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { addNewLeave, selectLeaveById, updateLeave } from "./leavesSlice"

const EditLeave = () => {

    const { leaveId } = useParams()

    const leave = useSelector((state) => selectLeaveById(state, Number(leaveId)))

    console.log(leave)

    const navigate = useNavigate()

    const [startDate, setStartDate] = useState(leave?.start_date)
    const [endDate, setEndDate] = useState(leave?.end_date)
    const [reason, setReason] = useState(leave?.reason)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch=useDispatch()

    const onStartDateChanged = e =>setStartDate(e.target.value)
    const onEndDateChanged = e => setEndDate(e.target.value)
    const validStartDate = !startDate || new Date(startDate).getTime() <= new Date().getTime() ? "form__input--incomplete" : ''
    const validEndDate = !endDate || new Date(endDate).getTime() <= new Date().getTime() ||new Date(endDate).getTime() < new Date(startDate).getTime() ? "form__input--incomplete" : ''

    const canSave = [startDate, endDate,!validEndDate,!validStartDate].every(Boolean) && addRequestStatus === 'idle' 

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            if (canSave) {
                try {
                    setAddRequestStatus('pending')
                    dispatch(updateLeave({start_date:startDate,end_date:endDate,id:Number(leaveId)})).unwrap()
                    navigate('/dash')
                } catch (err) {
                    console.error('Failed to save the post', err)
                } finally {
                    setAddRequestStatus('idle')
                }
            }
        }
    }
    
    

    const content = (
        <>
            

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>Edit Leave</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="startDate">
                    StartDate:</label>
                <input
                    className={`form__input ${validStartDate} `}
                    id="startDate"
                    name="startDate"
                    type="date"
                    autoComplete="off"
                    value={startDate}
                    onChange={onStartDateChanged}
                />
                <label className="form__label" htmlFor="endDate">
                    End Date:</label>
                <input
                    className={`form__input ${validEndDate}`}
                    id="endDate"
                    name="endDate"
                    type="date"
                    autoComplete="off"
                    value={endDate}
                    onChange={onEndDateChanged}
                />


            </form>
        </>
    )

    return content
}

export default EditLeave