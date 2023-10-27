import downloadFileFromStorage from "../../../api/downloadFileFromStorage";
import { ITF_File } from "../../../interface/interface";

//JSX: Image Container
export function ImageContainer({ images }: { images: ITF_File[] }) {
    return (
      <div className="ImageContainerMulti">
            {images.map((crr) => (
              <img key={crr.url} src={crr.url} alt={crr.name} onClick={()=> downloadFileFromStorage(crr)}/>
            ))}
          </div>
    );
  }
  //JSX_END: Image Container