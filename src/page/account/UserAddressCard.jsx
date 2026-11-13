import React from 'react'
import { MapPin, Trash2 } from 'lucide-react'

const UserAddressCard = ({ address, onDelete }) => {
    return (
        <div className='p-5 border rounded-lg hover:border-orange-300 transition-colors bg-white/50 backdrop-blur-sm shadow-sm flex gap-4 relative group'>
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <MapPin className="text-orange-500" size={20} />
            </div>

            <div className='space-y-2 flex-1'>
                <div className="flex justify-between items-start">
                    <h1 className="font-semibold text-gray-900">{address.venueName}</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 group-hover:hidden">
                            Saved Address
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(address.id);
                            }}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50 hidden group-hover:block cursor-pointer"
                            title="Delete Address"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                    {address.venueAddress}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{address.city}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{address.state}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{address.pincode}</span>
                </div>

                {address.phone && (
                    <div className="flex items-center gap-1.5 text-[11px] text-orange-600 font-bold bg-orange-50 w-fit px-2 py-0.5 rounded-md mt-1">
                        <span className="opacity-70 font-medium">Contact:</span>
                        <span>{address.phone}</span>
                    </div>
                )}
            </div>

        </div>
    )
}

export default UserAddressCard