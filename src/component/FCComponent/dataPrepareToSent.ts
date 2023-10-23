import postDataToDB from "../../api/postDataToDB";
import handleStringToTime from "./handleTimeStringToTime";

export function dataPrepareToSent(type: string,bucket:string, data: any, callback:Function) {
  if(!data) return //check data is empty
  const now = Date.now();
  const timeStamp = handleStringToTime("full", now.toString());
  const dataObject = {
    key: now,
    bucket: "string",
    date: timeStamp,
    status: "normal",
    content: {
      type: type,
      text: "",
      image: "",
      images: "",
      file: "",
      files: "",
      link: "",
      video: "",
      other: "",
    },
  };
  //TODO: handle data
  switch (type) {
    case 'text' :{
        dataObject.content.text = data
        break;
    }
}
  //TODO_END: handle data
  const uploadContainer = [{
    ref: `${bucket}/${now}`,
    data: dataObject
  }]
  // upload
 
  postDataToDB(uploadContainer, callback)
}
