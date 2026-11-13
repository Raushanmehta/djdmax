const EventBadge = ({ event }) => {
  return (
    <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded mb-1">
      {event.title}
    </div>
  )
}

export default EventBadge