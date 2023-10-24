import { ITF_File } from "../../../interface/interface";

//JSX: Image Container
export function ImageContainer({ images }: { images: ITF_File[] }) {
    return (
      <div className="ImageContainerMulti">
            {images.map((crr, index) => (
              <img key={crr.url} src={crr.url} />
            ))}
          </div>
    );
  }
  //JSX_END: Image Container