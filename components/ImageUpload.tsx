import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegImage } from "react-icons/fa6";
import { AiTwotoneCloseCircle } from "react-icons/ai";
interface DropzoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
  post?: boolean;
}

const ImageUpload: React.FC<DropzoneProps> = ({ onChange, label, value, disabled, post }) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback((base64: string) => {
    onChange(base64);
  }, [onChange]);

  const handleDrop = useCallback((files: any) => {
    const file = files[0]
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };
    reader.readAsDataURL(file);
  }, [handleChange])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    }
  });

  return (
    <div {...getRootProps({ className: value?'w-full p-4 flex flex-row justify-left ': ""})}>
      <input {...getInputProps()} />
      {base64 && post ? (
        <div className="flex items-center justify-center relative">
          <Image
            src={base64}
            height="500"
            width="100"
            className=" h-80 w-full rounded-md"
            alt="Uploaded image"
          />
          <AiTwotoneCloseCircle className="absolute top-0 right-0 mt-2 mr-2 text-2xl text-red-500 cursor-pointer" onClick={(e) =>{ e.stopPropagation(); setBase64(""); onChange("")}} />
        </div>
      ) : (
       <FaRegImage style={{ fontSize: 20, color: "#1DA1F2", cursor: "pointer" }} />
      )}
    </div>
  );
}

export default ImageUpload;