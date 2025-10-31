import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ statistics }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}س ${minutes}د ${secs}ث`;
    } else if (minutes > 0) {
      return `${minutes}د ${secs}ث`;
    }
    return `${secs}ث`;
  };

  const getSuccessRate = () => {
    if (statistics?.totalFiles === 0) return 0;
    return Math.round((statistics?.successfulFiles / statistics?.totalFiles) * 100);
  };

  const getStorageChange = () => {
    const change = statistics?.totalNewSize - statistics?.totalOriginalSize;
    const percentage = statistics?.totalOriginalSize > 0 
      ? Math.round((change / statistics?.totalOriginalSize) * 100) 
      : 0;
    return { change, percentage };
  };

  const storageChange = getStorageChange();

  const statCards = [
    {
      title: 'إجمالي الملفات',
      value: statistics?.totalFiles?.toString(),
      icon: 'Files',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'معدل النجاح',
      value: `${getSuccessRate()}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      subtitle: `${statistics?.successfulFiles} من ${statistics?.totalFiles}`
    },
    {
      title: 'وقت المعالجة الإجمالي',
      value: formatDuration(statistics?.totalProcessingTime),
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'تغيير حجم التخزين',
      value: formatFileSize(Math.abs(storageChange?.change)),
      icon: storageChange?.change >= 0 ? 'TrendingUp' : 'TrendingDown',
      color: storageChange?.change >= 0 ? 'text-error' : 'text-success',
      bgColor: storageChange?.change >= 0 ? 'bg-error/10' : 'bg-success/10',
      subtitle: `${storageChange?.percentage >= 0 ? '+' : ''}${storageChange?.percentage}%`
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">إحصائيات المعالجة</h3>
          <p className="text-sm text-text-secondary">نظرة عامة على نتائج المعالجة</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards?.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={16} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-text-secondary font-medium">{stat?.title}</p>
              <p className={`text-xl font-bold ${stat?.color}`}>{stat?.value}</p>
              {stat?.subtitle && (
                <p className="text-xs text-text-secondary">{stat?.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Status Breakdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-text-primary">تفصيل حالة الملفات</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm font-medium text-text-primary">ملفات ناجحة</span>
              </div>
              <span className="text-sm font-bold text-success">{statistics?.successfulFiles}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-error/5 border border-error/20">
              <div className="flex items-center gap-3">
                <Icon name="XCircle" size={16} color="var(--color-error)" />
                <span className="text-sm font-medium text-text-primary">ملفات فاشلة</span>
              </div>
              <span className="text-sm font-bold text-error">{statistics?.failedFiles}</span>
            </div>
            
            {statistics?.processingFiles > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={16} color="var(--color-warning)" />
                  <span className="text-sm font-medium text-text-primary">قيد المعالجة</span>
                </div>
                <span className="text-sm font-bold text-warning">{statistics?.processingFiles}</span>
              </div>
            )}
          </div>
        </div>

        {/* Processing Performance */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-text-primary">أداء المعالجة</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm text-text-secondary">متوسط وقت المعالجة</span>
              <span className="text-sm font-medium text-text-primary">
                {statistics?.totalFiles > 0 
                  ? formatDuration(Math.round(statistics?.totalProcessingTime / statistics?.totalFiles))
                  : '0ث'
                }
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm text-text-secondary">الحجم الأصلي الإجمالي</span>
              <span className="text-sm font-medium text-text-primary">
                {formatFileSize(statistics?.totalOriginalSize)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm text-text-secondary">الحجم الجديد الإجمالي</span>
              <span className="text-sm font-medium text-text-primary">
                {formatFileSize(statistics?.totalNewSize)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm text-text-secondary">متوسط FPS الأصلي</span>
              <span className="text-sm font-medium text-text-primary">
                {statistics?.totalFiles > 0 
                  ? Math.round(statistics?.averageOriginalFps)
                  : 0
                } fps
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
