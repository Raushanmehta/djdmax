import { useState } from "react"
import CalendarHeader from "./CalenderHeader"
import MonthView from "./MonthView"
import EventModal from "./EventModal"
import WeekView from "./WeekView"
import DayView from "./DayView"


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("month")
  const [events, setEvents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const addEvent = (event) => {
    setEvents([...events, event])
  }

  return (
    <div className="">
       <h2 className="text-2xl font-semibold mb-6">Calender</h2>
      <div className="bg-white border border-gray-200">

        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
          openModal={() => setIsOpen(true)}
        />

        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            events={events}
            setSelectedDate={setSelectedDate}
            openModal={() => setIsOpen(true)}
          />
        )}

        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
          />
        )}

        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
          />
        )}

        <EventModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          addEvent={addEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  )
}

export default Calendar