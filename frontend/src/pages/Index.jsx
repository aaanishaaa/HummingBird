import React, { useState, useRef } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import FileUpload from "@/components/FileUpload";
import LanguageSelector from "@/components/LanguageSelector";
import Transcript from "@/components/Transcript";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FormatSelectModal from "@/components/FormatSelectModal";

const Index = () => {
  const [file, setFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isTranscriptGenerated, setIsTranscriptGenerated] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef(null);

  const sampleText = {
    english:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    chinese:
      "我申请免费的 教育版，是为了提升我的设计技能，并更好地在学术项目和个人项目中进行协作。作为一名涉猎多领域的学生，使用 能让我更高效地进行原型设计和决定。这个机会不仅能支持我目前的课程和项目，还能为我未来在 设计领域打下坚实的基础。",
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);

    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setVideoUrl(url);

      // Simulate transcript generation after video upload
      setTimeout(() => {
        setIsTranscriptGenerated(true);
      }, 2000);
    } else {
      setVideoUrl(null);
      setIsTranscriptGenerated(false);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleDownload = () => {
    if (!file) {
      toast({
        title: "No file to download",
        description: "Please upload a video file first",
        variant: "destructive",
      });
      return;
    }

    if (!isTranscriptGenerated) {
      toast({
        title: "Transcript not ready",
        description: "Please wait for the transcript to be generated",
        variant: "destructive",
      });
      return;
    }

    // Show format selection modal only when download is clicked
    setShowFormatModal(true);
  };

  const handleFormatSelect = (format) => {
    toast({
      title: "Downloading transcript",
      description: `Your transcript is being downloaded as ${format} in ${selectedLanguage} language`,
    });

    setShowFormatModal(false);
  };

  const transcriptText =
    selectedLanguage === "chinese" ? sampleText.chinese : sampleText.english;

  return (
    <div className="main-container">
      <div className="content-container">
        {/* Header Row */}
        <div className="header-row justify-center">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Logo />

            {/* Choose File Button */}
            <FileUpload onFileUpload={handleFileUpload} />

            {/* Language Selector */}
            <LanguageSelector onLanguageSelect={handleLanguageSelect} />

            {/* Download Button */}
            <button
              className="download-button button-base"
              style={{ fontSize: "16px" }} 
              onClick={handleDownload}
            >
              <div className="mr-2">
                <Download size={28} strokeWidth={1.5} />
              </div>
              Download Transcript
            </button>
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Video and Transcript Section */}
        <div className="flex flex-row gap-4 w-full mt-6">
          {/* Video Preview Section */}
          <div className="w-[75%] bg-gray-200 dark:bg-gray-700 aspect-video rounded-lg overflow-hidden relative">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                controls
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Upload a video to see preview
                </p>
              </div>
            )}
          </div>

          {/* Transcript Section */}
          <div className="w-[25%] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-y-auto">
            <Transcript text={transcriptText} isGenerated={isTranscriptGenerated} />
          </div>
        </div>
      </div>

      {/* Format Selection Modal */}
      {showFormatModal && (
        <FormatSelectModal
          onFormatSelect={handleFormatSelect}
          onClose={() => setShowFormatModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
