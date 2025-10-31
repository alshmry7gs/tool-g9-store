import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStats = ({ stats }) => {
  const formatDuration = (seconds) => {
    if (!seconds) return '0ث';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}س ${minutes}د`;
    } else if (minutes > 0) {
      return `${minutes}د ${secs}ث`;
    } else {
      return `${secs}ث`;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 بايت';
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i))?.toFixed(1)} ${sizes?.[i]}`;
  };

  const calculateCompressionRatio = () => {
    if (!stats?.totalOriginalSize || !stats?.totalProcessedSize) return 0;
    return ((stats?.totalOriginalSize - stats?.totalProcessedSize) / stats?.totalOriginalSize * 100)?.toFixed(1);
  };

  const statItems = [
    {
      id: 'speed',
      label: 'سرعة المعالجة',
      value: `${stats?.processingSpeed?.toFixed(1) || 0} ميجابايت/ث`,
      icon: 'Zap',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'completed',
      label: 'الملفات المكتملة',
      value: `${stats?.completedFiles || 0} من ${stats?.totalFiles || 0}`,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      id: 'time',
      label: 'إجمالي وقت المعالجة',
      value: formatDuration(stats?.totalProcessingTime),
      icon: 'Clock',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'size',
      label: 'الحجم الأصلي',
      value: formatFileSize(stats?.totalOriginalSize),
      icon: 'HardDrive',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'processed-size',
      label: 'الحجم المعالج',
      value: formatFileSize(stats?.totalProcessedSize),
      icon: 'Archive',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'compression',
      label: 'نسبة الضغط',
      value: `${calculateCompressionRatio()}%`,
      icon: 'Minimize2',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
            <Icon name="BarChart3" size={16} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">إحصائيات المعالجة</h3>
            <p className="text-sm text-text-secondary">مقاييس الأداء والتقدم</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className={`flex items-center justify-center w-12 h-12 ${item?.bgColor} rounded-lg`}>
                <Icon name={item?.icon} size={20} color={item?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-lg font-semibold text-text-primary truncate">
                  {item?.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {item?.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Processing Efficiency Chart */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-text-primary">كفاءة المعالجة</h4>
            <span className="text-xs text-text-secondary">آخر 10 ملفات</span>
          </div>
          <div className="flex items-end space-x-2 rtl:space-x-reverse h-20">
            {[85, 92, 78, 95, 88, 91, 87, 93, 89, 96]?.map((efficiency, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-sm transition-all duration-300"
                  style={{ height: `${efficiency}%` }}
                ></div>
                <span className="text-xs text-text-secondary mt-1">{efficiency}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Average Processing Time by File Size */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-lg font-semibold text-text-primary">2.3 ثانية</div>
            <div className="text-xs text-text-secondary">متوسط وقت الملفات الصغيرة (&lt;100 ميجابايت)</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-lg font-semibold text-text-primary">8.7 ثانية</div>
            <div className="text-xs text-text-secondary">متوسط وقت الملفات المتوسطة (100-500 ميجابايت)</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-lg font-semibold text-text-primary">24.1 ثانية</div>
            <div className="text-xs text-text-secondary">متوسط وقت الملفات الكبيرة (&gt;500 ميجابايت)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStats;
