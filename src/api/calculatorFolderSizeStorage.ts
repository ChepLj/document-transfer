import { getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";

const calculatorFolderSizeStorage = async (folder: string) => {
 
  let size = 0;
  let fileCount = 0
  try {
    await getFolderSizeRecursive(folder);
    const sizeResult = Math.round(size/1000000)
    return {sizeResult, fileCount};
  } catch (err) {
    // probably denied permissions or 'path/to/storage/folder' is not a folder
    console.error(err);
  }
  //! START ---------------------
  async function getFolderSizeRecursive(folderPath: string) {
    const ref1 = ref(storage, folderPath);
    const list = await listAll(ref1);
    // console.log("🚀 ~ file: test.ts:18 ~ getFolderSizeRecursive ~ list:", list)

    for (const fileRef of list.items) {
      await addSizeItem(fileRef.fullPath);
    }
    for (const folderRef of list.prefixes) {
      await getFolderSizeRecursive(folderRef.fullPath);
    }
  }

  // Usage
  async function addSizeItem(filePath: string) {
    const fileRef = ref(storage, filePath);
    let metaData = await getMetadata(fileRef);
    size = size + metaData.size;
    fileCount ++
  }
  //! END -----------------------
};

export default calculatorFolderSizeStorage;
