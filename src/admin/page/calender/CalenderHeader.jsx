import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
  openModal
}) => {

  const changeDate = (direction) => {
    if (view === "month") {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + direction,
          1
        )
      )
    }
    else if (view === "week") {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + direction * 7
        )
      )
    }
    else {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + direction
        )
      )
    }
  }

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">

      <div className="flex gap-3 items-center">
        <Button
          size="icon"
          className="cursor-pointer border border-gray-200 hover:bg-gray-100"
          onClick={() => changeDate(-1)}
        >
          <ChevronLeft size={18} />
        </Button>

        <Button
          size="icon"
          className="cursor-pointer border border-gray-200 hover:bg-gray-100"
          onClick={() => changeDate(1)}
        >
          <ChevronRight size={18} />
        </Button>

        <Button
          onClick={openModal}
          className="border border-orange-500 hover:bg-orange-500 cursor-pointer"
        >
          Add Event +
        </Button>
      </div>

      <h2 className="font-semibold">
        {currentDate &&
          currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
      </h2>

      <div className="flex bg-orange-300 p-1 rounded-lg text-sm 
      font-medium cursor-pointer">
        {["month", "week", "day"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1 rounded-md cursor-pointer 
              capitalize ${view === v ? "bg-white shadow" : ""
              }`}
          >
            {v}
          </button>
        ))}
      </div>

    </div>
  )
}

export default CalendarHeader