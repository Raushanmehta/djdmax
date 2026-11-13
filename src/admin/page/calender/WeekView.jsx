import EventBadge from "./EventBadge"

const WeekView = ({ currentDate, events }) => {

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    return d
  })

  const formatDate = (date) =>
    date.toISOString().split("T")[0]

  return (
    <div className="grid grid-cols-7 border-t">

      {days.map((day, index) => {
        const dayString = formatDate(day)

        const dayEvents = events.filter(
          (event) => event.date === dayString
        )

        return (
          <div
            key={index}
            className="min-h-[200px] border-r p-2"
          >
            <div className="text-sm font-medium mb-2">
              {day.toDateString()}
            </div>

            {dayEvents.map((event, i) => (
              <EventBadge key={i} event={event} />
            ))}

          </div>
        )
      })}

    </div>
  )
}

export default WeekView