export const uploadToCloudinary = async (pics, folder) => {
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "djhgg6htl";
    const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "djdmax";
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";

    if (!pics) {
        console.warn("uploadToCloudinary called without file");
        return null;
    }

    console.log("Attempting direct upload to Cloudinary with preset:", upload_preset);

    // 1. Try direct client-side upload to Cloudinary
    try {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        if (folder) {
            data.append("folder", folder);
        }

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "POST",
            body: data,
        });

        const fileData = await res.json();

        if (res.ok && (fileData.secure_url || fileData.url)) {
            return fileData.secure_url || fileData.url;
        }

        console.warn("Direct Cloudinary upload response error:", fileData?.error?.message || fileData);
    } catch (err) {
        console.warn("Direct Cloudinary upload failed, falling back to backend:", err);
    }

    // 2. Fallback to backend API upload (signed upload via backend)
    console.log("Attempting upload via backend API fallback...");
    try {
        const backendData = new FormData();
        backendData.append("file", pics);
        if (folder) {
            backendData.append("folder", folder);
        }

        const backendRes = await fetch(`${BASE_URL}/upload`, {
            method: "POST",
            body: backendData,
        });

        const backendResult = await backendRes.json();

        if (backendRes.ok && (backendResult.url || backendResult.secure_url)) {
            console.log("Backend upload succeeded:", backendResult.url || backendResult.secure_url);
            return backendResult.url || backendResult.secure_url;
        }

        console.error("Backend Cloudinary upload error:", backendResult);
        return null;
    } catch (backendErr) {
        console.error("Backend upload request failed:", backendErr);
        return null;
    }
}
