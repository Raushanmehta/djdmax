import { useState } from "react"
import { Button } from "@/components/ui/button"

const EventModal = ({ isOpen, onClose, addEvent, selectedDate }) => {
  const [title, setTitle] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    addEvent({
      title,
      date: selectedDate,
    })
    setTitle("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">

        <h3 className="font-semibold mb-4">Add Event</h3>

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>

      </div>
    </div>
  )
}

export default EventModal