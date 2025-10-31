import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileTable = ({ files, onRemoveFile, onClearAll }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'processing':
        return <Icon name="Loader2" size={16} className="text-warning animate-spin" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Clock" size={16} className="text-text-secondary" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready':
        return 'جاهز';
      case 'processing':
        return 'قيد المعالجة';
      case 'error':
        return 'خطأ';
      default:
        return 'في الانتظار';
    }
  };

  if (files?.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-8 text-center">
        <Icon name="Video" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          لا توجد ملفات مرفوعة
        </h3>
        <p className="text-text-secondary">
          ابدأ برفع ملفات MP4 لمعالجة البيانات الوصفية وتعديل معدل الإطارات
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">
          الملفات المرفوعة ({files?.length})
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Trash2" 
          iconPosition="left"
          onClick={onClearAll}
          disabled={files?.length === 0}
        >
          مسح الكل
        </Button>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-right p-3 text-sm font-medium text-text-secondary">اسم الملف</th>
              <th className="text-right p-3 text-sm font-medium text-text-secondary">المدة</th>
              <th className="text-right p-3 text-sm font-medium text-text-secondary">معدل الإطارات الأصلي</th>
              <th className="text-right p-3 text-sm font-medium text-text-secondary">حجم الملف</th>
              <th className="text-right p-3 text-sm font-medium text-text-secondary">الحالة</th>
              <th className="text-right p-3 text-sm font-medium text-text-secondary">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {files?.map((file, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Icon name="Video" size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-text-primary truncate max-w-xs">
                        {file?.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {file?.type}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-text-secondary">
                  {formatDuration(file?.duration || 120)}
                </td>
                <td className="p-3 text-text-secondary">
                  {file?.fps || 30} fps
                </td>
                <td className="p-3 text-text-secondary">
                  {formatFileSize(file?.size)}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusIcon(file?.status || 'ready')}
                    <span className="text-sm text-text-secondary">
                      {getStatusText(file?.status || 'ready')}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => onRemoveFile(index)}
                    className="text-error hover:text-error hover:bg-error/10"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 p-4">
        {files?.map((file, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 space-x-reverse flex-1 min-w-0">
                <Icon name="Video" size={20} className="text-primary flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-text-primary truncate">
                    {file?.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {file?.type}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onRemoveFile(index)}
                className="text-error hover:text-error hover:bg-error/10 flex-shrink-0"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">المدة:</span>
                <span className="text-text-primary mr-2">
                  {formatDuration(file?.duration || 120)}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">معدل الإطارات:</span>
                <span className="text-text-primary mr-2">
                  {file?.fps || 30} fps
                </span>
              </div>
              <div>
                <span className="text-text-secondary">الحجم:</span>
                <span className="text-text-primary mr-2">
                  {formatFileSize(file?.size)}
                </span>
              </div>
              <div className="flex items-center">
                {getStatusIcon(file?.status || 'ready')}
                <span className="text-text-secondary mr-2">
                  {getStatusText(file?.status || 'ready')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileTable;
