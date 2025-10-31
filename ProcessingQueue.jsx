import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ files, onProceedToProcessing }) => {
  const totalFiles = files?.length;
  const readyFiles = files?.filter(file => file?.status === 'ready' || !file?.status)?.length;
  const processingFiles = files?.filter(file => file?.status === 'processing')?.length;
  const completedFiles = files?.filter(file => file?.status === 'completed')?.length;
  const errorFiles = files?.filter(file => file?.status === 'error')?.length;

  const totalSize = files?.reduce((acc, file) => acc + file?.size, 0);
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const estimatedTime = Math.ceil(totalFiles * 2.5); // Estimated 2.5 minutes per file

  const getProgressPercentage = () => {
    if (totalFiles === 0) return 0;
    return Math.round((completedFiles / totalFiles) * 100);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          ملخص قائمة المعالجة
        </h3>
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-text-secondary">
          <Icon name="Clock" size={16} />
          <span>الوقت المقدر: {estimatedTime} دقيقة</span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{totalFiles}</div>
          <div className="text-sm text-text-secondary">إجمالي الملفات</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">{readyFiles}</div>
          <div className="text-sm text-text-secondary">جاهز للمعالجة</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">{processingFiles}</div>
          <div className="text-sm text-text-secondary">قيد المعالجة</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">{formatFileSize(totalSize)}</div>
          <div className="text-sm text-text-secondary">الحجم الإجمالي</div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalFiles > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">تقدم المعالجة</span>
            <span className="text-text-primary font-medium">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary">
            <span>{completedFiles} مكتمل</span>
            <span>{totalFiles - completedFiles} متبقي</span>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      {totalFiles > 0 && (
        <div className="flex flex-wrap gap-4 text-sm">
          {readyFiles > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-text-secondary">{readyFiles} جاهز</span>
            </div>
          )}
          {processingFiles > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Icon name="Loader2" size={16} className="text-warning animate-spin" />
              <span className="text-text-secondary">{processingFiles} قيد المعالجة</span>
            </div>
          )}
          {completedFiles > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Icon name="Download" size={16} className="text-primary" />
              <span className="text-text-secondary">{completedFiles} مكتمل</span>
            </div>
          )}
          {errorFiles > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Icon name="XCircle" size={16} className="text-error" />
              <span className="text-text-secondary">{errorFiles} خطأ</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="default"
          iconName="Play"
          iconPosition="left"
          onClick={onProceedToProcessing}
          disabled={readyFiles === 0}
          className="flex-1"
        >
          بدء المعالجة ({readyFiles} ملف)
        </Button>
        
        <Button
          variant="outline"
          iconName="Edit3"
          iconPosition="left"
          disabled={totalFiles === 0}
          className="flex-1"
        >
          تحرير البيانات الوصفية
        </Button>
      </div>

      {/* Help Text */}
      {totalFiles === 0 && (
        <div className="text-center py-8">
          <Icon name="Upload" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">
            قم برفع ملفات MP4 لبدء عملية المعالجة
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessingQueue;
