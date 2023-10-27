import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";

const deleteDataFromStorage = async (refPath: string, callback: Function) => {
  deleteObject(ref(storage,refPath))
    .then(() => {callback("delete successfully")})
    .catch((error) => {alert(error)});
};

export default deleteDataFromStorage;
