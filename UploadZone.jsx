import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const mp4Files = files?.filter(file => file?.type === 'video/mp4');
    
    if (mp4Files?.length > 0) {
      onFilesSelected(mp4Files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    onFilesSelected(files);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
          }
          ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".mp4,video/mp4"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200
            ${isDragOver ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}
          `}>
            <Icon name="Upload" size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              {isDragOver ? 'إسقاط الملفات هنا' : 'رفع ملفات الفيديو'}
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              اسحب وأسقط ملفات MP4 هنا أو انقر للتصفح. الحد الأقصى لحجم الملف: 2GB
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-text-secondary">
            <span className="px-2 py-1 bg-surface rounded border">MP4</span>
            <span className="px-2 py-1 bg-surface rounded border">H.264</span>
            <span className="px-2 py-1 bg-surface rounded border">H.265</span>
          </div>
          
          <Button 
            variant="outline" 
            iconName="FolderOpen" 
            iconPosition="left"
            className="mt-4"
            disabled={isProcessing}
          >
            تصفح الملفات
          </Button>
        </div>
        
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="text-primary font-medium">
              إسقاط الملفات للرفع
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
