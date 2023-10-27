import { getDownloadURL, ref } from "firebase/storage";
import { ITF_File } from "../interface/interface";
import { storage } from "./firebase/firebaseConfig";
export default function downloadFileFromStorage(fileObject: ITF_File) {
 
  //TODO: handel download NEW

  const handelDownload = () => {
    const fileReference = ref(storage, fileObject.url); // Replace with the path to your file

    getDownloadURL(fileReference)
      .then((url) => {
        // Create a link to download the file
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.target = "_blank"; // Open in a new tab
        // downloadLink.download = "downloaded_file.jpg"; // Specify the desired file name

        // Trigger the download
        downloadLink.click()
        
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  };

  //TODO_END: handel download NEW
  handelDownload();
}
