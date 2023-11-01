import { IoDocumentAttachOutline } from "react-icons/io5";
import { ITF_File } from "../../../interface/interface";
import downloadFileFromStorage from "../../../api/downloadFileFromStorage";
import { Row } from "react-bootstrap";
import { Col } from 'react-bootstrap';

//JSX: File Container
export function FileContainer({ file }: { file: ITF_File }) {
    return (
      <Row className="FileContainer justify-content-between" xs={3}>
        <Col className="File" xs={'auto'}>
          <IoDocumentAttachOutline />
        </Col>
        <Col className="ItemName p-0">{file.name}</Col>
        <Col className="ItemRear pe-0" xs={'auto'}>
          <div className="Button">
            <span className="ItemDownload" onClick={()=> downloadFileFromStorage(file)}>Download</span>
            <span className="ItemHead">
              <span className="Type">{file.type}</span>
              <span className="Size">{Math.round((+file.size)/1000000)}Mb</span>
            </span>
          </div>
        </Col>
      </Row>
    );
  }
  //JSX_END: File Container