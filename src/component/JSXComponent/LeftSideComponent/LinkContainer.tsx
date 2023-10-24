import { FaLink } from "react-icons/fa";

//JSX: Link Container
export function LinkContainer({ link }: { link: string }) {
    return (
      <div className="LinkContainer">
        <span className="File" style={{ paddingRight: "10px", color: "blue" }}>
          <FaLink />
        </span>
  
        <a href="">dfdsfdfsfsfsdf</a>
      </div>
    );
  }
  //JSX_END: Link Container