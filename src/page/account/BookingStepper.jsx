import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

const steps = [
  {
    name: "Booking Requested",
    description: "Your event booking request has been submitted",
    value: "PENDING",
  },
  {
    name: "Booking Confirmed",
    description: "The organizer has confirmed your event",
    value: "CONFIRMED",
  },
  {
    name: "Event In Progress",
    description: "Your event is currently happening",
    value: "ONGOING",
  },
  {
    name: "Event Completed",
    description: "Your event has been successfully completed",
    value: "COMPLETED",
  },
]

const cancelSteps = [
  {
    name: "Booking Requested",
    description: "Your event booking request was submitted",
    value: "PENDING",
  },
  {
    name: "Booking Cancelled",
    description: "Your event booking has been cancelled",
    value: "CANCELLED",
  },
]


const BookingStepper = ({ orderStatus }) => {
  const [statusStep, setStatusStep] = useState(steps)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const data = orderStatus === "CANCELLED" ? cancelSteps : steps
    setStatusStep(data)

    const index = data.findIndex(step => step.value === orderStatus)
    setCurrentStep(index === -1 ? 0 : index)
  }, [orderStatus])

  return (
    <Card className="bg-transparent border-none">
      <CardContent className="py-">
        <div className="space-y-6">
          {statusStep.map((step, index) => (
            <div key={index} className="flex items-start gap-4">

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${index <= currentStep
                      ? orderStatus === "CANCELLED"
                        ? "bg-red-600 text-white"
                        : "bg-orange-500 text-white"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  {step.value === orderStatus ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={14} />
                  )}
                </div>

                {index < statusStep.length - 1 && (
                  <div
                    className={`w-[2px] h-10 mt-1
                    ${index < currentStep
                        ? orderStatus === "CANCELLED"
                          ? "bg-red-600"
                          : "bg-orange-500"
                        : "bg-muted"
                      }`}
                  />
                )}
              </div>

              {/* Right Side (Text) */}
              <div className="flex-1">
                <div
                  className={`p-3 rounded-lg transition
                  ${step.value === orderStatus
                      ? orderStatus === "CANCELLED"
                        ? "bg-red-600 text-white"
                        : "bg-orange-500 text-white"
                      : ""
                    }`}
                >
                  <p className="font-medium">{step.name}</p>
                  <p
                    className={`text-xs mt-1
                    ${step.value === orderStatus
                        ? "text-white/80"
                        : "text-muted-foreground"
                      }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingStepper