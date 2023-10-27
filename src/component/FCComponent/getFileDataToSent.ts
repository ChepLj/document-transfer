import { handleTextUpload } from "./handelTextUpload";
import { handleFileUpload } from "./handleFileUpload";

 //Todo: Get File Data to Sent
export const getFileDataToSent = ({file, bucket, setRefresh}:{file: File, setRefresh:Function, bucket:string}) => {
  const childElmId = Math.random().toString();
  const childElmProgressId = Math.random().toString();
  
  if (file) {
    const temp: string[] = file.name.split(".");
    const tagTemp = temp[temp.length - 1];
    const innerHTML = `
        <div class="FileContainer " >
          <span class="File">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M208 64h66.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62V432a48 48 0 01-48 48H192a48 48 0 01-48-48V304"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M288 72v120a32 32 0 0032 32h120"></path><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M160 80v152a23.69 23.69 0 01-24 24c-12 0-24-9.1-24-24V88c0-30.59 16.57-56 48-56s48 24.8 48 55.38v138.75c0 43-27.82 77.87-72 77.87s-72-34.86-72-77.87V144"></path></svg>
          </span>
          <span class="ItemName">${file.name}</span>
          <span class="ItemRear">
            <div class="Button">
              <span class="ItemDownload CancelColor " >Cancel</span>
              <span class="ItemHead">
                <span class="Type">${tagTemp}</span>
                <span class="Size">${Math.floor(file.size / 1000000)}Mb</span>
              </span>
            </div>
          </span>
        </div>
        <progress id=${childElmProgressId} class="Progress" max="100" value="0"></progress>`;
    const listElm = document.getElementById("LeftSideList");
    const childElm = document.createElement("div");
    childElm.innerHTML = innerHTML;
    childElm.id = childElmId;
    childElm.className = "BorderBottom";
    // childElm.addEventListener('click',callbackCancelUpload)
    listElm?.appendChild(childElm);
    var elem = document.querySelector(".LeftSide .List");
    elem!.scrollTop = elem!.scrollHeight;
  }
  //callback
  const callbackGetURLDone = (value: string) => {
    const callback = (messenger: string) => {
      if (messenger === "post successfully!") {
        const element = document.getElementById(childElmId);
        element!.remove();
        setRefresh(Math.random());
      } else {
        alert("error");
      }
    };
    handleTextUpload("file", bucket, value,now, callback);
  };
  
  // uploading
  const now = Date.now();
  handleFileUpload(bucket, file, childElmProgressId,now, callbackGetURLDone );
};
//Todo_END: Get File Data to Sent