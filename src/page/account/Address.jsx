import React, { useEffect, useState } from 'react'
import UserAddressCard from './UserAddressCard'
import { bookingAPI } from '@/lib/api'
import { toast } from 'sonner'
import { Plus, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import AddressForm from '../chekout/AddressForm'

const Address = () => {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const data = await bookingAPI.getAddresses()
      setAddresses(data.data || [])
    } catch (error) {
      toast.error("Failed to fetch saved addresses")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleSuccess = () => {
    setIsModalOpen(false)
    fetchAddresses()
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await bookingAPI.deleteAddress(id);
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error) {
      toast.error(error.message || "Failed to delete address");
    }
  }


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="animate-spin text-orange-500" size={32} />
        <p className="text-sm text-muted-foreground font-medium">Fetching your addresses...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="text-orange-500" size={18} />
            Saved Addresses
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold ml-2">
              {addresses.length}
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Manage your venue locations for quick booking.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm flex items-center gap-2">
              <Plus size={16} />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Save another location for quick booking in the future.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <AddressForm onSuccess={handleSuccess} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className=" flex flex-col gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <UserAddressCard
              key={address.id}
              address={address}
              onDelete={handleDelete}
            />
          ))

        ) : (
          <div className="col-span-full border-2 border-dashed border-gray-100 rounded-xl py-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-gray-300" size={28} />
            </div>
            <h2 className="text-base font-semibold text-gray-700">No addresses saved yet</h2>
            <p className="text-sm text-gray-500 max-w-[240px] mt-1 mb-6">
              You haven't saved any venue locations. Add one to make checkout faster!
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Add Your First Address
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Address