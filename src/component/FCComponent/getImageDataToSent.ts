import { ITF_File } from "../../interface/interface";
import { handleTextUpload } from "./handelTextUpload";
import { handleImageUpload } from "./handleImageUpload";


 //TODO: Get Image Data to Sent
 export const getImageDataToSent = (images: File[], bucket:string, setRefresh:Function) => {
  console.log('images' ,images );
  console.log('bucket' ,bucket);
  console.log('setRefresh' ,setRefresh );
  const childElmId = Math.random().toString();
  // const childElmProgressId = Math.random().toString();


  const imagesElm = images.map((crr, index) => `<div class='ImageContainerMultiWrap'><img src=${URL.createObjectURL(crr)} /> <progress id=${`imageChild-${crr.size.toString()}`} class="ProgressMultiImage" max="100" value="0"></progress> </div>`);
    const innerHTML = `
        <div class="ImageContainerMulti">
            ${imagesElm.join("")}
        </div>
        `;

    const listElm = document.getElementById("LeftSideList");
    const childElm = document.createElement("div");
    childElm.innerHTML = innerHTML;
    childElm.id = childElmId;
    childElm.className = "BorderBottom";
    listElm?.appendChild(childElm);
    var elem = document.querySelector(".LeftSide .List");
    elem!.scrollTop = elem!.scrollHeight;
    //!...............
    //callback
    const callbackGetURLDone = (value: string[]) => {
      const callback = (messenger: string) => {
        if (messenger === "post successfully!") {
          const element = document.getElementById(childElmId);
          element!.remove();
          setRefresh(Math.random());
        } else {
          alert("error");
        }
      };

      handleTextUpload("image", bucket, value,now, callback);
    };

    // uploading
    const URLArray:any = []
    const handleCountURLDone = (result: ITF_File)=>{
      if(result){
        URLArray.push(result)
        if(URLArray.length === images.length){
          callbackGetURLDone(URLArray)
        }
      }
    }
    const now = Date.now();
    images.forEach((crr)=>handleImageUpload(bucket, crr, `imageChild-${crr.size.toString()}`,now, handleCountURLDone))
    
  }
//TODO_END: Get Image Data to Sent