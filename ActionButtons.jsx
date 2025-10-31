import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  selectedVideo, 
  modifiedMetadata, 
  onSaveChanges, 
  onResetAll, 
  onNavigateToProcessing 
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const hasChanges = modifiedMetadata && (
    modifiedMetadata?.mvhd || modifiedMetadata?.mdhd
  );

  const handleConfirmAction = (action) => {
    setConfirmAction(action);
    setShowConfirmDialog(true);
  };

  const executeAction = () => {
    if (confirmAction === 'reset') {
      onResetAll();
    } else if (confirmAction === 'save') {
      onSaveChanges();
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const cancelAction = () => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-warning rounded-lg">
            <Icon name="Settings" size={20} color="white" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">إجراءات التحرير</h2>
        </div>

        <div className="space-y-4">
          {/* Status Indicator */}
          <div className={`p-4 rounded-lg border-2 ${
            hasChanges 
              ? 'border-accent bg-accent bg-opacity-10' :'border-muted bg-muted'
          }`}>
            <div className="flex items-center space-x-3">
              <Icon 
                name={hasChanges ? 'AlertCircle' : 'CheckCircle'} 
                size={20} 
                className={hasChanges ? 'text-accent' : 'text-success'} 
              />
              <div>
                <p className="font-medium text-text-primary">
                  {hasChanges ? 'يوجد تغييرات غير محفوظة' : 'لا توجد تغييرات'}
                </p>
                <p className="text-sm text-text-secondary">
                  {hasChanges 
                    ? 'احفظ التغييرات قبل المتابعة إلى المعالجة' :'جميع التغييرات محفوظة'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleConfirmAction('reset')}
              iconName="RotateCcw"
              iconPosition="left"
              disabled={!selectedVideo || !hasChanges}
              className="w-full"
            >
              إعادة تعيين الكل
            </Button>
            
            <Button
              variant="default"
              onClick={() => handleConfirmAction('save')}
              iconName="Save"
              iconPosition="left"
              disabled={!selectedVideo || !hasChanges}
              className="w-full"
            >
              حفظ التغييرات
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="success"
              onClick={onNavigateToProcessing}
              iconName="ArrowRight"
              iconPosition="right"
              disabled={!selectedVideo}
              fullWidth
              className="h-12"
            >
              المتابعة إلى المعالجة
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="mb-2">
                  <strong>نصائح:</strong>
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• استخدم الإعدادات المسبقة للحصول على قيم صحيحة</li>
                  <li>• تأكد من صحة القيم قبل الحفظ</li>
                  <li>• يمكنك إعادة تعيين التغييرات في أي وقت</li>
                  <li>• احفظ التغييرات قبل المتابعة إلى المعالجة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-warning rounded-lg">
                <Icon name="AlertTriangle" size={20} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                تأكيد الإجراء
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              {confirmAction === 'reset' ?'هل أنت متأكد من إعادة تعيين جميع التغييرات؟ سيتم فقدان جميع التعديلات غير المحفوظة.' :'هل تريد حفظ التغييرات المطبقة على البيانات الوصفية؟'
              }
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={cancelAction}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                variant={confirmAction === 'reset' ? 'destructive' : 'default'}
                onClick={executeAction}
                className="flex-1"
              >
                {confirmAction === 'reset' ? 'إعادة تعيين' : 'حفظ'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;
