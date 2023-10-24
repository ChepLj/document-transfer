import postDataToStorage from "../../api/postDataToStorage";
import { ITF_Mime, MIMEtype } from "../MIMEtype";


export function handleFileUpload (bucket:string, file:File,  childElmProgressId:string ,callbackGetURLDone:Function){
        //TODO: Set File Progress State
        const setFileProgressState =(progressState:any)=>{
            const childElmProgress = document.getElementById(childElmProgressId) as HTMLProgressElement
            childElmProgress.value = Math.round((progressState.bytesTransferred/progressState.totalBytes)*100)
        }
        //TODO_END: Set File Progress State

        const fileName = file.name
        const ref = `${bucket}/FILE/`;
        const temp: string[] = file.name.split(".");
        const tagTemp = temp[temp.length - 1]
        // callback
        const callback = (messenger: string, result: any) => {
          if (messenger === "Upload completed successfully") {
            const objectTemp = {
                url: result,
                name: fileName,
                type: tagTemp,
                size:file.size,
                ref: ref
            }
            callbackGetURLDone(objectTemp)
            
          } else if (messenger === "Upload Failed") {
            alert('error')
          }
        };

        // post
        if (file.type === "") {
          const temp: string[] = file.name.split(".");
          const tagTemp = temp[temp.length - 1] as keyof ITF_Mime;
          const newMetadata = {
            contentType: MIMEtype[tagTemp]
          };
          postDataToStorage(file, ref, fileName, callback, setFileProgressState,newMetadata);

        }
        else{
          postDataToStorage(file, ref, fileName, callback, setFileProgressState);
        }
        
}