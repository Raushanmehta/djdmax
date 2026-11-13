import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { FiUpload, FiX } from "react-icons/fi"
import { Loader2 } from "lucide-react"

import { uploadToCloudinary } from "@/lib/uploadToCloudnary"
import TiptapEditor from "@/components/TiptapEditor"
import { categoryAPI, adminAPI } from "@/lib/api"
import { useNavigate, useSearchParams } from "react-router-dom"

import { locations } from "@/data/filter/location"

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title required"),

  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description required"),

  bookingPrice: Yup.number().positive("Must be positive").required("Booking price required"),
  mrpPrice: Yup.number().positive("Must be positive").required("MRP price required"),

  categoryId: Yup.string().required("Please select a category"),

  images: Yup.array().min(1, "At least one image required"),
})



export default function AddEventForm() {
  const [uploadImage, setUploadImage] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [innerCategories, setInnerCategories] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get("edit")

  // Fetch categories on mount
  useEffect(() => {
    categoryAPI.getAll()
      .then((data) => setCategories(data.data || []))
      .catch(() => toast.error("Failed to load categories"))
  }, [])

  // IF EDIT MODE: Load event details
  useEffect(() => {
    if (editId && categories.length > 0) {
      adminAPI.getEvent(editId)
        .then((res) => {
          const event = res.data
          formik.setValues({
            title: event.title || "",
            description: event.description || "",
            details: event.details || "",
            bookingPrice: event.bookingPrice || "",
            mrpPrice: event.mrpPrice || "",
            images: event.images || [],
            categoryId: event.categoryId || "",
            subCategoryId: event.subCategoryId || "",
            innerCategoryId: event.innerCategoryId || "",
          })


          // Setup sub/inner categories dropdowns based on loaded levels
          const cat = categories.find(c => c.id === event.categoryId)
          if (cat) {
            setSubCategories(cat.subCategories || [])
            const sub = cat.subCategories?.find(s => s.id === event.subCategoryId)
            if (sub) {
              setInnerCategories(sub.innerCategories || [])
            }
          }
        })
        .catch(() => toast.error("Failed to load event for editing"))
    }
  }, [editId, categories])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      details: "",
      bookingPrice: "",
      mrpPrice: "",
      images: [],
      categoryId: "",
      subCategoryId: "",
      innerCategoryId: "",
    },


    validationSchema,

    onSubmit: async (values) => {
      try {
        setSubmitting(true)
        const payload = {
          title: values.title,
          description: values.description,
          details: values.details,
          bookingPrice: values.bookingPrice,
          mrpPrice: values.mrpPrice,
          images: values.images,
          categoryId: values.categoryId,
          subCategoryId: values.subCategoryId || null,
          innerCategoryId: values.innerCategoryId || null,
        }


        if (editId) {
          await adminAPI.updateEvent(editId, payload)
          toast.success("Event updated successfully! 🚀")
        } else {
          await adminAPI.createEvent(payload)
          toast.success("Event created successfully! 🎉")
        }
        navigate("/admin/events")
      } catch (error) {
        toast.error(error.message || "Failed to save event")
      } finally {
        setSubmitting(false)
      }
    }
  })


  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadImage(true)
    try {
      const imageUrl = await uploadToCloudinary(file, "djdmax/events")
      if (imageUrl) {
        formik.setFieldValue("images", [...formik.values.images, imageUrl])
        toast.success("Image uploaded!")
      } else {
        toast.error("Failed to get image URL from Cloudinary")
      }

    } catch {
      toast.error("Image upload failed")
    } finally {
      setUploadImage(false)
    }
  }

  const removeImage = (index) => {
    const updated = [...formik.values.images]
    updated.splice(index, 1)
    formik.setFieldValue("images", updated)
  }

  // When category level 1 changes, update subcategories
  const handleCategoryChange = (catId) => {
    formik.setFieldValue("categoryId", catId)
    formik.setFieldValue("subCategoryId", "")
    formik.setFieldValue("innerCategoryId", "")
    const cat = categories.find(c => c.id === catId)
    setSubCategories(cat?.subCategories || [])
    setInnerCategories([])
  }

  // When category level 2 changes, update inner categories
  const handleSubCategoryChange = (subCatId) => {
    formik.setFieldValue("subCategoryId", subCatId)
    formik.setFieldValue("innerCategoryId", "")
    const sub = subCategories.find(s => s.id === subCatId)
    setInnerCategories(sub?.innerCategories || [])
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full bg-white border border-gray-200">
        <CardHeader>
          <CardTitle>{editId ? "Edit Event" : "Add New Event"}</CardTitle>
          <CardDescription>
            {editId ? "Modify the existing event details" : "Fill the details to create a new event"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
          >
            {/* Image Upload */}
            <div className="flex gap-4 flex-wrap">
              <Input
                type="file"
                accept="image/*"
                id="fileUpload"
                className="hidden border border-gray-200"
                onChange={handleImageChange}
                disabled={formik.values.images.length >= 5}
              />

              <label
                htmlFor="fileUpload"
                className={`w-24 h-24 border rounded-lg flex items-center 
                justify-center cursor-pointer transition ${formik.values.images.length >= 5 ? "opacity-40 cursor-not-allowed" : "hover:border-orange-400"
                  }`}
              >
                {uploadImage ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <FiUpload size={22} />
                )}
              </label>

              {formik.values.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    className="w-24 h-24 rounded-md object-cover"
                    alt={`event-${index}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>

            {formik.touched.images && formik.errors.images && (
              <p className="text-red-500 text-sm">{formik.errors.images}</p>
            )}

            {/* Title */}
            <div>
              <Input
                name="title"
                placeholder="Event Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-200"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Textarea
                name="description"
                placeholder="Event Description"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            {/* Price Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  name="mrpPrice"
                  placeholder="MRP Price (₹)"
                  value={formik.values.mrpPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-200"
                />
                {formik.touched.mrpPrice && formik.errors.mrpPrice && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.mrpPrice}</p>
                )}
              </div>

              <div>
                <Input
                  type="number"
                  name="bookingPrice"
                  placeholder="Booking Price (₹)"
                  value={formik.values.bookingPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-200"
                />
                {formik.touched.bookingPrice && formik.errors.bookingPrice && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.bookingPrice}</p>
                )}
              </div>
            </div>

            {/* Category Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Category 1 */}
              <div>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full bg-white cursor-pointer">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                        className="cursor-pointer hover:bg-orange-100 focus:bg-orange-100"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.categoryId}</p>
                )}
              </div>

              {/* Category 2 */}
              {subCategories.length > 0 && (
                <Select onValueChange={handleSubCategoryChange}>
                  <SelectTrigger className="w-full bg-white cursor-pointer">
                    <SelectValue placeholder="Sub Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {subCategories.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                        className="cursor-pointer hover:bg-orange-100 focus:bg-orange-100"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Category 3 */}
              {innerCategories.length > 0 && (
                <Select onValueChange={(value) => formik.setFieldValue("innerCategoryId", value)}>
                  <SelectTrigger className="w-full bg-white cursor-pointer">
                    <SelectValue placeholder="Inner Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {innerCategories.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                        className="cursor-pointer hover:bg-orange-100 focus:bg-orange-100"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Rich Text Details */}
            <div>
              <p className="text-sm font-medium mb-2 text-gray-600">Event Details (Rich Text)</p>
              <TiptapEditor
                value={formik.values.details}
                onChange={(value) =>
                  formik.setFieldValue("details", value)
                }
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              variant="default"
              disabled={submitting}
            >
              {submitting && <Loader2 className="animate-spin mr-2" size={16} />}
              {submitting ? (editId ? "Updating..." : "Creating...") : (editId ? "Update Event" : "Add Event")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
