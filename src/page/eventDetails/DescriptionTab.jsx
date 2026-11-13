export default function DescriptionTab({ description }) {
    return (
        <div className="mt-8 text-gray-600 leading-7">

            <p>
                {description || "No description available for this event."}
            </p>


        </div>
    )
}