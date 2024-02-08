import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  fileExtension?: string;
}

export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (fileExtension && !file.name.endsWith(`.${fileExtension}`)) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Invalid file type. Expected: .${fileExtension}`);
      return;
    }

    const fileSizeInfos: string[] = [];
    validFiles.forEach((file) => {
      const fileSizeInKB = Math.round(file.size / 1024);
      fileSizeInfos.push(`${file.name} (${fileSizeInKB} KB)`);
    });

    const fileList = validFiles.map((file) => URL.createObjectURL(file));
    onChange((prevFiles) => [...prevFiles, ...fileList]);
    setFileInfo(
      `Uploaded ${validFiles.length} file(s): ${fileSizeInfos.join(", ")}`
    );
    setError(null);

    // Set image previews
    const newImagePreviews = [...imagePreviews];
    validFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          newImagePreviews.push(reader.result as string);
          setImagePreviews(newImagePreviews);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center text-muted-foreground">
          <span className="font-medium">Drag Files to Upload or</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
            onClick={handleButtonClick}
          >
            Click Here
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept={`.${fileExtension}`}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </div>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="w-32 h-32 mr-2 mb-2 relative ">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-full rounded object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {fileInfo && <p className="text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  );
}
