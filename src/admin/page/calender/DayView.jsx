import EventBadge from "./EventBadge"

const DayView = ({ currentDate, events }) => {

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]
  }

  const todayString = formatDate(currentDate)

  const dayEvents = events.filter(
    (event) => event.date === todayString
  )

  return (
    <div className="p-6">

      {/* Day Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {currentDate.toDateString()}
        </h2>
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-1 gap-4">
        {dayEvents.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No events for this day
          </div>
        ) : (
          dayEvents.map((event, index) => (
            <EventBadge key={index} event={event} />
          ))
        )}
      </div>

    </div>
  )
}

export default DayView