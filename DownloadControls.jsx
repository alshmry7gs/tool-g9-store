import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadControls = ({ 
  results, 
  onDownloadAll, 
  onDownloadSelected, 
  onRetryFailed, 
  onStartNewBatch, 
  onClearResults 
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const successfulResults = results?.filter(r => r?.status === 'success');
  const failedResults = results?.filter(r => r?.status === 'failed');

  const handleSelectAll = () => {
    if (selectedFiles?.length === successfulResults?.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(successfulResults?.map(r => r?.id));
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => 
      prev?.includes(fileId) 
        ? prev?.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      await onDownloadAll();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedFiles?.length === 0) return;
    
    setIsDownloading(true);
    try {
      const selectedResults = results?.filter(r => selectedFiles?.includes(r?.id));
      await onDownloadSelected(selectedResults);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClearResults = () => {
    onClearResults();
    setShowConfirmClear(false);
    setSelectedFiles([]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getTotalSize = () => {
    return successfulResults?.reduce((total, result) => total + (result?.newSize || 0), 0);
  };

  const getSelectedSize = () => {
    return results?.filter(r => selectedFiles?.includes(r?.id))?.reduce((total, result) => total + (result?.newSize || 0), 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="Download" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">عناصر التحكم في التحميل</h3>
          <p className="text-sm text-text-secondary">إدارة تحميل الملفات المعالجة</p>
        </div>
      </div>
      {/* Download Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">ملفات جاهزة للتحميل</span>
          </div>
          <div className="text-xl font-bold text-text-primary">{successfulResults?.length}</div>
          <div className="text-xs text-text-secondary">
            الحجم الإجمالي: {formatFileSize(getTotalSize())}
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="MousePointer" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">ملفات محددة</span>
          </div>
          <div className="text-xl font-bold text-text-primary">{selectedFiles?.length}</div>
          <div className="text-xs text-text-secondary">
            الحجم المحدد: {formatFileSize(getSelectedSize())}
          </div>
        </div>

        <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="XCircle" size={16} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">ملفات فاشلة</span>
          </div>
          <div className="text-xl font-bold text-text-primary">{failedResults?.length}</div>
          <div className="text-xs text-text-secondary">
            تحتاج إعادة معالجة
          </div>
        </div>
      </div>
      {/* File Selection */}
      {successfulResults?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-text-primary">تحديد الملفات للتحميل</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedFiles?.length === successfulResults?.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
            </Button>
          </div>
          
          <div className="max-h-48 overflow-y-auto border border-border rounded-lg">
            {successfulResults?.map((result) => (
              <div 
                key={result?.id} 
                className="flex items-center gap-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={selectedFiles?.includes(result?.id)}
                  onChange={() => handleSelectFile(result?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <Icon name="FileVideo" size={16} color="var(--color-primary)" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {result?.newName}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatFileSize(result?.newSize)} • {result?.newFps} fps
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Download Actions */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleDownloadAll}
            disabled={successfulResults?.length === 0 || isDownloading}
            loading={isDownloading}
            fullWidth
          >
            تحميل جميع الملفات ({successfulResults?.length})
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleDownloadSelected}
            disabled={selectedFiles?.length === 0 || isDownloading}
            loading={isDownloading}
            fullWidth
          >
            تحميل المحدد ({selectedFiles?.length})
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="secondary"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onRetryFailed}
            disabled={failedResults?.length === 0}
            fullWidth
          >
            إعادة معالجة الفاشل ({failedResults?.length})
          </Button>
          
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={onStartNewBatch}
            fullWidth
          >
            دفعة جديدة
          </Button>
          
          <Button
            variant="ghost"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => setShowConfirmClear(true)}
            disabled={results?.length === 0}
            fullWidth
          >
            مسح النتائج
          </Button>
        </div>
      </div>
      {/* Download Progress Info */}
      {isDownloading && (
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">جاري تحضير التحميل...</p>
              <p className="text-xs text-text-secondary">
                يتم إنشاء أرشيف ZIP للملفات المحددة
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Clear Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
              <h3 className="text-lg font-semibold text-text-primary">تأكيد مسح النتائج</h3>
            </div>
            <p className="text-sm text-text-secondary mb-6">
              هل أنت متأكد من أنك تريد مسح جميع النتائج؟ لن يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3">
              <Button
                variant="destructive"
                onClick={handleClearResults}
                fullWidth
              >
                نعم، امسح النتائج
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmClear(false)}
                fullWidth
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadControls;
