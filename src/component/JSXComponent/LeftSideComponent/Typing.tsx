import { useContext } from "react";
import { FaImages } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { MAIN_CONTEXT } from "../../../App";
import { handelOpenImageFile, handelOpenTextFile } from "../../FCComponent/browserFile";
import { getFileDataToSent } from "../../FCComponent/getFileDataToSent";
import { getImageDataToSent } from "../../FCComponent/getImageDataToSent";
import { handleTextUpload } from "../../FCComponent/handelTextUpload";

//JSX: Typing
function Typing() {
  const {setRefresh, bucket } = useContext<any>(MAIN_CONTEXT);

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
    const now = Date.now();
    handleTextUpload("text", bucket, value, now, callback);
  };
  //Todo_END: Get Text Data to Sent

  //TODO: Check executable file  Because policy of firebase
  const checkExecutableFile = (file: File) => {
    const temp: string[] = file.name.split(".");
    const tagTemp = temp[temp.length - 1];
    const executableFileArray = ["exe", "dll", "bat", "apk", "api"];
    if (executableFileArray.includes(tagTemp)) {
      alert("Do chính sách của server không cho phép upload các tập tin thực thi [ exe , dll , apk , ipa , bat ]\n\nHãy bọc tập tin thành file Zip hoặc nén thành file Rar trước khi upload !!! ");
    } else {
      // check image
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      if (imageExtensions.includes(tagTemp)) {
        getImageDataToSent([file], bucket, setRefresh);
      } else {
        getFileDataToSent({ file, bucket, setRefresh});
      }
    }
  };

  //TODO_END: Check executable file  Because policy of firebase
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
          <span className="Image" onClick={() => handelOpenImageFile((images: File[]) => getImageDataToSent(images, bucket, setRefresh))}>
            <FaImages />
          </span>
          <span className="File" onClick={() => handelOpenTextFile((files: File[]) => files.map((file: File) => checkExecutableFile(file)))}>
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

//! export
export { Typing };

