import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationAlert = ({ errors, onDismiss }) => {
  if (!errors || errors?.length === 0) return null;

  const getErrorIcon = (type) => {
    switch (type) {
      case 'format':
        return 'FileX';
      case 'size':
        return 'AlertTriangle';
      case 'corrupted':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  const getErrorMessage = (error) => {
    switch (error?.type) {
      case 'format':
        return `الملف "${error?.filename}" ليس بصيغة MP4 صالحة`;
      case 'size':
        return `الملف "${error?.filename}" يتجاوز الحد الأقصى للحجم (2GB)`;
      case 'corrupted':
        return `الملف "${error?.filename}" تالف أو غير قابل للقراءة`;
      default:
        return `خطأ في الملف "${error?.filename}"`;
    }
  };

  return (
    <div className="bg-error/10 border border-error/20 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Icon name="AlertTriangle" size={20} className="text-error" />
          <h4 className="font-medium text-error">
            أخطاء في التحقق من الملفات ({errors?.length})
          </h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onDismiss}
          className="text-error hover:text-error hover:bg-error/10"
        />
      </div>
      <div className="space-y-2">
        {errors?.map((error, index) => (
          <div key={index} className="flex items-start space-x-3 space-x-reverse">
            <Icon 
              name={getErrorIcon(error?.type)} 
              size={16} 
              className="text-error mt-0.5 flex-shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-error">
                {getErrorMessage(error)}
              </p>
              {error?.suggestion && (
                <p className="text-xs text-text-secondary mt-1">
                  {error?.suggestion}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-error/20">
        <div className="flex items-center space-x-2 space-x-reverse text-xs text-text-secondary">
          <Icon name="Info" size={14} />
          <span>
            الصيغ المدعومة: MP4 فقط. الحد الأقصى للحجم: 2GB لكل ملف
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValidationAlert;
