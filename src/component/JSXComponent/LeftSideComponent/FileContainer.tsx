import { IoDocumentAttachOutline } from "react-icons/io5";
import { ITF_File } from "../../../interface/interface";
import downloadFileFromStorage from "../../../api/downloadFileFromStorage";

//JSX: File Container
export function FileContainer({ file }: { file: ITF_File }) {
    return (
      <div className="FileContainer">
        <span className="File">
          <IoDocumentAttachOutline />
        </span>
        <span className="ItemName">{file.name}</span>
        <span className="ItemRear">
          <div className="Button">
            <span className="ItemDownload" onClick={()=> downloadFileFromStorage(file)}>Download</span>
            <span className="ItemHead">
              <span className="Type">{file.type}</span>
              <span className="Size">{Math.round((+file.size)/1000000)}Mb</span>
            </span>
          </div>
        </span>
      </div>
    );
  }
  //JSX_END: File Container