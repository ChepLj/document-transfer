import deleteFolderDataFromStorage from "../../api/deleteFolderDataFromStorage";
import postDataToDB from "../../api/postDataToDB";
import { ITF_FullData } from "../../interface/interface";

export function deleteItemObject(item: ITF_FullData,setRefresh:Function, id?: string) {
  const callback = () => {
    if ("post successfully!") {
        if(id){
            const elm = document.getElementById(id);
            // elm!.remove();
            elm!.classList.add('hidden')
        }
        else{
            setRefresh(Math.random())
        }

    } else {
      alert("Error");
    }
  };
  const uploadContainer = [
    {
      ref: item.ref,
      data: null,
    },
  ];

  switch (item.content.type) {
    case "file": {
      const callbackDeleteFile = (messenger: string) => {
        if (messenger === "delete successfully") {
          postDataToDB(uploadContainer, callback);
        } else {
          alert("error");
        }
      };
      deleteFolderDataFromStorage(item.content.file.ref, callbackDeleteFile);
      break;
    }
    case "image": {
      const callbackDeleteFile = (messenger: string) => {
        if (messenger === "delete successfully") {
          postDataToDB(uploadContainer, callback);
        } else {
          alert("error");
        }
      };
      deleteFolderDataFromStorage(item.content.images[0].ref, callbackDeleteFile);
      break;
    }
    default: {
      postDataToDB(uploadContainer, callback);
    }
  }
}
