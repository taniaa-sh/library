type CloudinaryResourceType = 'image' | 'video' | 'raw';

interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
}

export const uploadToCloudinary = async (
    file: File,
    resourceType: CloudinaryResourceType
): Promise<string> => {
    const cloudName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing');
    }

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
            method: 'POST',
            body: formData,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.error?.message || 'File upload failed'
        );
    }

    return (result as CloudinaryUploadResponse).secure_url;
};