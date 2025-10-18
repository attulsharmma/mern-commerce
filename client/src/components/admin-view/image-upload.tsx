import { useRef, type ChangeEvent, type DragEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ImageUploadProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadedImageUrl: string;
  setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>;
}
const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile?.(selectedFile);
    }
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  const handleRemoveImage = (): void => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 h-8 text-primary" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
