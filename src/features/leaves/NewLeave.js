import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { addNewLeave } from "./leavesSlice"

const NewLeave = () => {

    const navigate = useNavigate()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch=useDispatch()
   

    // useEffect(() => {
    //     if (isSuccess) {
    //         setTitle('')
    //         setText('')
    //         setUserId('')
    //         navigate('/dash/notes')
    //     }
    // }, [isSuccess, navigate])

    const onStartDateChanged = e =>setStartDate(e.target.value)
    const onEndDateChanged = e => setEndDate(e.target.value)
    const onTextChanged = e => setReason(e.target.value)
    const validStartDate = !startDate ? "form__input--incomplete" : ''
    const validEndDate = !endDate ||new Date(endDate).getTime() < new Date(startDate).getTime() ? "form__input--incomplete" : ''

    const canSave = [startDate, endDate,!validEndDate,!validStartDate].every(Boolean) && addRequestStatus === 'idle' 

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            if (canSave) {
                try {
                    setAddRequestStatus('pending')
                    dispatch(addNewLeave({start_date:startDate,end_date:endDate,reason })).unwrap()
    
                    // setTitle('')
                    // setContent('')
                    // setUserId('')
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
            {/* <p >{error?.data?.message}</p> */}

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Leave</h2>
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

                <label className="form__label" htmlFor="text">
                    Reason:</label>
                <textarea
                     className={`form__input form__input--text`}
                    id="text"
                    name="text"
                    value={reason}
                    onChange={onTextChanged}
                />


            </form>
        </>
    )

    return content
}

export default NewLeave