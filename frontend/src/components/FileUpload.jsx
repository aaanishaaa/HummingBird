import React, { useState, useRef, useEffect } from "react";
import { Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // This effect will hide the upload complete message after 2 seconds
  useEffect(() => {
    let timer;
    if (uploadComplete) {
      timer = window.setTimeout(() => {
        setUploadComplete(false);
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [uploadComplete]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check if file is a video
      if (!selectedFile.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file (MP4, MOV, etc.)",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      simulateUpload(selectedFile);
    }
  };

  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;

        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          onFileUpload(file); // Pass the file to parent component when upload is complete
          return 100;
        }

        return newProgress;
      });
    }, 500);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderUploadContent = () => {
    if (!file) {
      return (
        <div
          className="file-upload-box flex items-center justify-center gap-2"
          onClick={handleButtonClick}
        >
          <div className="text-blue-500">
            <Upload size={28} strokeWidth={1.5} />
          </div>
          <p className="text-gray-500 dark:text-gray-200">Click to upload</p>
        </div>
      );
    }

    if (isUploading) {
      return (
        <div className="modal">
          <div className="modal-content flex flex-col items-center">
            {/* Hover effect design */}
            <section className="relative group flex flex-col items-center justify-center w-full h-full mt-5">
              <div className="file relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-50">
                <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"></div>
                <div className="work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"></div>
                <div className="work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"></div>
                <div className="work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"></div>
                <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-amber-400 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(1px)]"></div>
              </div>
              <p className="text-3xl pt-4 text-gray-300">Uploading...</p>
            </section>

            {/* File name and progress */}
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
              {fileName}
            </p>
            <div className="flex items-center gap-2 text-blue-500 dark:text-blue-300 mt-1">
              <span className="text-lg">{uploadProgress}%</span>
              <span>Uploading</span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400">8.77 MB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }

    if (uploadComplete) {
      return (
        <div className="modal">
          <div className="modal-content flex flex-col items-center">
            {/* Hover effect design for upload complete */}
            <section className="relative group flex flex-col items-center justify-center w-full h-full">
              <div className="file relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-50 mt-5">
                <div className="work-5 bg-green-600 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-green-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-green-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"></div>
                <div className="work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"></div>
                <div className="work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"></div>
                <div className="work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"></div>
                <div className="work-1 absolute bottom-0 bg-gradient-to-t from-green-500 to-green-400 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-green-400 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-green-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#34d399,_inset_0_-20px_40px_#059669] group-hover:[transform:rotateX(-46deg)_translateY(1px)]"></div>
              </div>
              <p className="text-3xl pt-4 text-gray-300">Upload Complete</p>
            </section>

            {/* File name */}
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
              {fileName}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        accept="video/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <div>
        <div className="flex items-center gap-4">
          <button onClick={handleButtonClick} className="gray-button">
            Choose File
          </button>
          {renderUploadContent()}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
