import { FaImages } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { IoDocumentAttachOutline } from "react-icons/io5";
import './LeftSide.css'
//JSX: Left Side
export function LeftSide() {
    return (
      <section className="LeftSide">
        <div className="Contents">
          <ul className="List">
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7,
              8,
            ].map((crr, index) => {
              return <ImageContainer/>
            })}
          </ul>
        </div>
        <Typing/>
      </section>
    );
  }
  //JSX_END: Left Side
  //JSX: Typing
  function Typing(){
    return <div className="Typing">
    <textarea
      className="Input"
      placeholder="enter text"
      spellCheck={false}
      autoFocus
    ></textarea>
    <div className="Button">
      <div className="Attachments">
        <span className="Image">
          <FaImages />
        </span>
        <span className="File">
          <IoDocumentAttachOutline />
        </span>
      </div>
      <button className="SentButton">Sent</button>
    </div>
  </div>
  }
  //JSX_END: Typing
  
  //JSX: Text Container
  function TextContainer(){
    return <li className="Item">
    <div className="TextContainer">
      Hello
      <br />
      hjhg
    </div>
    <div className="FooterItem">
        <div className="TimeStamp">2023/10/09 14h30</div>
        <FaRegTrashCan className="DeleteButton"/>
    </div>
  </li>
  }
  //JSX_END: Text Container
  
  //JSX: Image Container
  function ImageContainer(){
    return <li className="Item">
    <div className="ImageContainerOnly">
      <img  src='https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80'/>
    </div>
    <div className="FooterItem">
        <div className="TimeStamp">2023/10/09 14h30 ...</div>
        <FaRegTrashCan className="DeleteButton"/>
    </div>
  </li>
  }
  //JSX_END: Image Container