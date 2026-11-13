const EventDetailsTab = ({ details }) => {
    return (
        <div className="mt-8 space-y-3">
             {details ? (
                <div 
                    className="prose prose-sm max-w-none text-gray-600 leading-7"
                    dangerouslySetInnerHTML={{ __html: details }} 
                />
            ) : (
                <p className="text-gray-600">No additional details provided for this event.</p>
            )}
        </div>
    )
}
export default EventDetailsTab