import multer from "multer"; // Import multer for handling file uploads
import { v4 as uuid } from "uuid"; // Import uuid to generate unique identifiers

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination(req, file, callback) {
    callback(null, "uploads"); // Files will be saved in the 'uploads' folder
  },

  // Set the filename for uploaded files
  filename(req, file, callback) {
    const newfilename = uuid(); // Generate a unique identifier for the file
    const extension = file.originalname.split(".").pop(); // Extract the file extension from the original filename

    callback(null, `${newfilename}.${extension}`); // Combine the unique identifier with the file extension
  },
});

// Export a single file upload middleware for handling single file uploads with the field name 'image'
export const singleUpload = multer({ storage }).single("image");
