/**
 * Checks if the given media type is an image.
 * @param mediaType The media type string (e.g., "image/png", "video/mp4").
 * @returns True if the media type is an image, false otherwise.
 */
export const getIsMediaTypeImage = (mediaType: string | undefined | null) => {
    if (!mediaType) return false;
    return mediaType.startsWith("image/");
};