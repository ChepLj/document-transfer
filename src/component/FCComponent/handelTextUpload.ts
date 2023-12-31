import postDataToDB from "../../api/postDataToDB";
import handleStringToTime from "./handleTimeStringToTime";

export function handleTextUpload(type: string, bucket: string, data: any, now: number, callback: Function) {
  if (!data) return; //check data is empty

  const timeStamp = handleStringToTime("full", now.toString());
  const dataObject = {
    ref: `${bucket}/${now}`,
    key: now,
    bucket: bucket,
    date: timeStamp,
    status: "normal",
    content: {
      type: type,
      text: "",

      images: [],

      file: "",
      link: "",
      video: "",
      other: "",
    },
  };
  //TODO: handle data
  switch (type) {
    case "text": {
      dataObject.content.text = data;
      break;
    }
    case "file": {
      dataObject.content.file = data;
      break;
    }
    case "image": {
      dataObject.content.images = data;
      break;
    }
  }
  //TODO_END: handle data
  const uploadContainer = [
    {
      ref: `${bucket}/${now}`,
      data: dataObject,

    },
  ];
  // upload
  console.log("🚀 ~ file: handelTextUpload.ts:46 ~ handleTextUpload ~ dataObject:", dataObject)
  postDataToDB(uploadContainer, callback);
}
