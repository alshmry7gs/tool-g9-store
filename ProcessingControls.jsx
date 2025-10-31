import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingControls = ({ 
  isProcessing, 
  isPaused, 
  onPauseResume, 
  onCancelAll, 
  onRetryFailed,
  failedCount 
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCancelAll = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelAll = () => {
    onCancelAll();
    setShowCancelDialog(false);
  };

  return (
    <>
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
              <Icon name="Settings" size={16} color="var(--color-warning)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">التحكم في المعالجة</h3>
              <p className="text-sm text-text-secondary">إدارة العمليات الجارية</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className={`w-3 h-3 rounded-full ${isProcessing ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
            <span className="text-sm text-text-secondary">
              {isProcessing ? (isPaused ? 'متوقف مؤقتاً' : 'نشط') : 'غير نشط'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pause/Resume Button */}
          <Button
            variant={isPaused ? "default" : "outline"}
            iconName={isPaused ? "Play" : "Pause"}
            iconPosition="left"
            onClick={onPauseResume}
            disabled={!isProcessing}
            className="w-full"
          >
            {isPaused ? 'استئناف' : 'إيقاف مؤقت'}
          </Button>

          {/* Retry Failed Button */}
          <Button
            variant="secondary"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onRetryFailed}
            disabled={failedCount === 0}
            className="w-full"
          >
            إعادة المحاولة ({failedCount})
          </Button>

          {/* Cancel All Button */}
          <Button
            variant="destructive"
            iconName="Square"
            iconPosition="left"
            onClick={handleCancelAll}
            disabled={!isProcessing}
            className="w-full"
          >
            إلغاء الكل
          </Button>

          {/* Settings Button */}
          <Button
            variant="ghost"
            iconName="Settings"
            iconPosition="left"
            className="w-full"
          >
            الإعدادات
          </Button>
        </div>

        {/* Processing Options */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-text-primary mb-3">خيارات المعالجة</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">المعالجة المتوازية</span>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  defaultValue="2" 
                  className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-text-primary min-w-8">2</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">أولوية المعالج</span>
              <select className="text-sm bg-background border border-border rounded px-2 py-1">
                <option value="normal">عادية</option>
                <option value="high">عالية</option>
                <option value="low">منخفضة</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Resources */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">45%</div>
            <div className="text-xs text-text-secondary">استخدام المعالج</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">2.1 جيجابايت</div>
            <div className="text-xs text-text-secondary">استخدام الذاكرة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">15 ميجابايت/ث</div>
            <div className="text-xs text-text-secondary">سرعة القراءة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">12 ميجابايت/ث</div>
            <div className="text-xs text-text-secondary">سرعة الكتابة</div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-6 max-w-md w-full mx-4 shadow-lg">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-lg">
                <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">تأكيد الإلغاء</h3>
                <p className="text-sm text-text-secondary">هل أنت متأكد من إلغاء جميع العمليات؟</p>
              </div>
            </div>
            
            <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-text-secondary">
                سيتم إلغاء جميع العمليات الجارية وفقدان التقدم المحرز. لا يمكن التراجع عن هذا الإجراء.
              </p>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                onClick={confirmCancelAll}
                className="flex-1"
              >
                نعم، إلغاء الكل
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessingControls;
