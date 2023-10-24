import { useContext } from "react";
import { FaImages } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { MAIN_CONTEXT } from "../../../App";
import { handelOpenImageFile, handelOpenTextFile } from "../../FCComponent/browserFile";
import { getKeyByValue } from "../../FCComponent/getKeyByValue";
import { handleTextUpload } from "../../FCComponent/handelTextUpload";
import { handleFileUpload } from "../../FCComponent/handleFileUpload";
import { MIMEtype } from "../../MIMEtype";
import { handleImageUpload } from "../../FCComponent/handleImageUpload";
import { ITF_File } from "../../../interface/interface";

//JSX: Typing
export function Typing() {
  const { refresh, setRefresh, bucket } = useContext<any>(MAIN_CONTEXT);

  //Todo: Get Text Data to Sent
  const getTextDataToSent = () => {
    
    const typingInputElm = document.getElementById("TypingInput") as HTMLTextAreaElement;
    const value = typingInputElm?.value;
    
    const callback = (messenger: string) => {
      if (messenger === "post successfully!") {
        typingInputElm.value = "";
        setRefresh(Math.random());
      } else {
        alert("error");
      }
    };
    handleTextUpload("text", bucket, value, callback);
  };
  //Todo_END: Get Text Data to Sent

  //Todo: Get File Data to Sent
  const getFileDataToSent = (file: File) => {
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
                <span class="ItemDownload CancelColor">Cancel</span>
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
      handleTextUpload("file", bucket, value, callback);
    };

    // uploading
    handleFileUpload(bucket, file, childElmProgressId, callbackGetURLDone);
  };
  //Todo_END: Get File Data to Sent

  //TODO: Get Image Data to Sent
  const getImageDataToSent = (images: File[]) => {
    console.log(images);
    const childElmId = Math.random().toString();
    const childElmProgressId = Math.random().toString();


    const imagesElm = images.map((crr, index) => `<div class='ImageContainerMultiWrap'><img src=${URL.createObjectURL(crr)} /> <progress id=${childElmProgressId} class="ProgressMultiImage" max="100" value="0"></progress> </div>`);
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
        handleTextUpload("image", bucket, value, callback);
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
      images.forEach((crr)=>handleImageUpload(bucket, crr, childElmProgressId, handleCountURLDone))
      
    }
  //TODO_END: Get Image Data to Sent

  //! return
  return (
    <div className="Typing">
      <textarea
        id="TypingInput"
        className="Input"
        placeholder="enter text"
        spellCheck={false}
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault(); // Ensure it is only this code that runs
            getTextDataToSent();
          }
        }}
      ></textarea>
      <div className="Button">
        <div className="Attachments">
          <span className="Image" onClick={() => handelOpenImageFile(getImageDataToSent)}>
            <FaImages />
          </span>
          <span className="File" onClick={() => handelOpenTextFile(getFileDataToSent)}>
            <IoDocumentAttachOutline />
          </span>
        </div>
        <button className="SentButton" onClick={getTextDataToSent}>
          Sent
        </button>
      </div>
    </div>
  );
}
//JSX_END: Typing
