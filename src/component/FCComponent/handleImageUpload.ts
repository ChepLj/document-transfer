import postDataToStorage from "../../api/postDataToStorage";
import { ITF_Mime, MIMEtype } from "../MIMEtype";


export function handleImageUpload (bucket:string, image:File,  childElmProgressId:string ,callbackGetURLDone:Function){
        //TODO: Set image Progress State
        const setImageProgressState =(progressState:any)=>{
            const childElmProgress = document.getElementById(childElmProgressId) as HTMLProgressElement
            childElmProgress.value = Math.round((progressState.bytesTransferred/progressState.totalBytes)*100)
        }
        //TODO_END: Set image Progress State

        const imageName = image.name
        const ref = `${bucket}/IMAGE/`;
        const temp: string[] = image.name.split(".");
        const tagTemp = temp[temp.length - 1]
        // callback
        const callback = (messenger: string, result: any) => {
          if (messenger === "Upload completed successfully") {
            const objectTemp = {
                url: result,
                name: imageName,
                type: tagTemp,
                size:image.size,
                ref: ref
            }
            callbackGetURLDone(objectTemp)
            
          } else if (messenger === "Upload Failed") {
            alert('error')
          }
        };

        // post
        if (image.type === "") {
          const temp: string[] = image.name.split(".");
          const tagTemp = temp[temp.length - 1] as keyof ITF_Mime;
          const newMetadata = {
            contentType: MIMEtype[tagTemp]
          };
          postDataToStorage(image, ref, imageName, callback, setImageProgressState,newMetadata);

        }
        else{
          postDataToStorage(image, ref, imageName, callback, setImageProgressState);
        }
        
}