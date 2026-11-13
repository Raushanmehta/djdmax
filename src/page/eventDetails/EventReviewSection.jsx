import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import DescriptionTab from "./DescriptionTab"
import EventDetailsTab from "./EventDetailsTab"
import ReviewsTable from "./ReviewsTable"



const EventReviewSection = ({ event }) => {
    return (
        <div className="max-w-6xl mx-auto mt-10 ">

            <Tabs defaultValue="description">

                <TabsList className="grid grid-cols-3 w-[500px] mx-auto ">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="details">Event Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({event?.totalReviews || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                    <DescriptionTab description={event?.description} />
                </TabsContent>

                <TabsContent value="details">
                    <EventDetailsTab details={event?.details} />
                </TabsContent>

                <TabsContent value="reviews">
                    <ReviewsTable eventId={event?.id} />
                </TabsContent>

            </Tabs>

        </div>
    )
}

export default EventReviewSection