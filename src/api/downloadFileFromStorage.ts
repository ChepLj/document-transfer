import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";
import { ITF_drawingContentItem } from "../interface/interface";//! sua lai cho nay
export default function downloadFileFromStorage(item: ITF_drawingContentItem) {
 
  //TODO: handel download NEW

  const handelDownload = () => {
    const fileReference = ref(storage, item.urlFileStore!.fileURL); // Replace with the path to your file

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
