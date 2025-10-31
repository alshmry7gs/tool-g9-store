import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingProgress = ({ overallProgress, currentFile, estimatedTime, processingSpeed }) => {
  const formatTime = (seconds) => {
    if (!seconds || seconds === Infinity) return 'حساب الوقت...';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}س ${minutes}د ${secs}ث`;
    } else if (minutes > 0) {
      return `${minutes}د ${secs}ث`;
    } else {
      return `${secs}ث`;
    }
  };

  const formatSpeed = (speed) => {
    if (!speed) return '0 ميجابايت/ث';
    if (speed < 1) return `${(speed * 1024)?.toFixed(1)} كيلوبايت/ث`;
    return `${speed?.toFixed(1)} ميجابايت/ث`;
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">تقدم المعالجة</h2>
            <p className="text-sm text-text-secondary">مراقبة العمليات الجارية</p>
          </div>
        </div>
        <div className="text-left rtl:text-right">
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-xs text-text-secondary">مكتمل</div>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">التقدم الإجمالي</span>
          <span className="text-sm text-text-secondary">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          >
            <div className="h-full bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Current File Processing */}
      {currentFile && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="FileVideo" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm font-medium text-text-primary truncate max-w-48">
                {currentFile?.name}
              </span>
            </div>
            <span className="text-sm text-text-secondary">{currentFile?.progress}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${currentFile?.progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-text-secondary">{currentFile?.stage}</span>
            <span className="text-xs text-text-secondary">{currentFile?.size}</span>
          </div>
        </div>
      )}
      {/* Processing Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{formatTime(estimatedTime)}</div>
          <div className="text-xs text-text-secondary">الوقت المتبقي</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{formatSpeed(processingSpeed)}</div>
          <div className="text-xs text-text-secondary">سرعة المعالجة</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">3</div>
          <div className="text-xs text-text-secondary">مكتملة</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-warning">2</div>
          <div className="text-xs text-text-secondary">قيد المعالجة</div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingProgress;
