import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const AddressCard = ({
  data,
  selectedId,
  onSelect,
}) => {
  const isChecked = selectedId === data.id;

  return (
    <div className={`flex items-start gap-4 p-5 border rounded-md transition-all ${isChecked ? 'border-orange-500 bg-orange-50/10 shadow-sm' : 'border-gray-200'}`}>

      {/* Checkbox acting as Radio for selection */}
      <Checkbox
        id={data.id}
        checked={isChecked}
        onCheckedChange={() => onSelect(data.id)}
        className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
      />

      {/* Right Content */}
      <Label
        htmlFor={data.id}
        className="cursor-pointer flex-1"
      >
        <div className="space-y-1">
          <h1 className="font-bold text-gray-800">{data.venueName}</h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            {data.venueAddress}
          </p>
          <p className="text-sm text-gray-500">
            {data.city}, {data.state} - <span className="font-mono">{data.pincode}</span>
          </p>
        </div>
      </Label>

    </div>
  );
};

export default AddressCard;