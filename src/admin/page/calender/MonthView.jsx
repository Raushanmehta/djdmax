import EventBadge from "./EventBadge"

const MonthView = ({ currentDate, events, setSelectedDate, openModal }) => {

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
  }

  return (
    <>
      <div className="grid grid-cols-7  text-sm font-medium">
        {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
          <div key={d} className="p-3  border-r border-gray-200">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 border border-gray-200">
        {Array.from({length:firstDay}).map((_,i) => (
          <div key={i} className="h-32 " />
        ))}

        {Array.from({length:daysInMonth}).map((_,i)=>{
          const day=i+1
          const dateStr=formatDate(day)
          const dayEvents=events.filter(e=>e.date===dateStr)

          return(
            <div
              key={day}
              className="h-32 border border-gray-200 p-2 cursor-pointer 
              hover:bg-orange-300"
              onClick={()=>{
                setSelectedDate(dateStr)
                openModal()
              }}
            >
              <div className="text-sm mb-1">{day}</div>
              {dayEvents.map((event,index)=>(
                <EventBadge key={index} event={event}/>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MonthView