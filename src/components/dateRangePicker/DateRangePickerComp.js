import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useDispatch } from 'react-redux'


const DateRangePickerComp = ({range,setRange}) => {


 

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }



  const handleChange=(item)=>{

    setRange([item.selection]);

  }



  return (
    <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "yyyy-MM-dd")} to ${format(range[0].endDate, "yyyy-MM-dd")}`}
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open && 
          <DateRangePicker
            onChange={(item)=>handleChange(item)}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        }
      </div>

    </div>
  )
}

export default DateRangePickerComp