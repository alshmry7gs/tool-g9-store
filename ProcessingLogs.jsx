import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingLogs = ({ logs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLogLevel, setSelectedLogLevel] = useState('all');

  const getLogIcon = (level) => {
    switch (level) {
      case 'info':
        return { name: 'Info', color: 'var(--color-primary)' };
      case 'success':
        return { name: 'CheckCircle', color: 'var(--color-success)' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'var(--color-warning)' };
      case 'error':
        return { name: 'XCircle', color: 'var(--color-error)' };
      default:
        return { name: 'Circle', color: 'var(--color-text-secondary)' };
    }
  };

  const getLogLevelText = (level) => {
    switch (level) {
      case 'info':
        return 'معلومات';
      case 'success':
        return 'نجح';
      case 'warning':
        return 'تحذير';
      case 'error':
        return 'خطأ';
      default:
        return level;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredLogs = selectedLogLevel === 'all' 
    ? logs 
    : logs?.filter(log => log?.level === selectedLogLevel);

  const logLevels = [
    { value: 'all', label: 'الكل', count: logs?.length },
    { value: 'info', label: 'معلومات', count: logs?.filter(l => l?.level === 'info')?.length },
    { value: 'success', label: 'نجح', count: logs?.filter(l => l?.level === 'success')?.length },
    { value: 'warning', label: 'تحذير', count: logs?.filter(l => l?.level === 'warning')?.length },
    { value: 'error', label: 'خطأ', count: logs?.filter(l => l?.level === 'error')?.length }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
              <Icon name="FileText" size={16} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">سجلات المعالجة</h3>
              <p className="text-sm text-text-secondary">تفاصيل العمليات والأخطاء</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'إخفاء' : 'عرض'} السجلات
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6">
          {/* Log Level Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {logLevels?.map((level) => (
              <button
                key={level?.value}
                onClick={() => setSelectedLogLevel(level?.value)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${selectedLogLevel === level?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-muted/80'
                  }
                `}
              >
                {level?.label} ({level?.count})
              </button>
            ))}
          </div>

          {/* Logs Container */}
          <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
            {filteredLogs?.length > 0 ? (
              <div className="space-y-3">
                {filteredLogs?.map((log) => {
                  const logIcon = getLogIcon(log?.level);
                  return (
                    <div key={log?.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className="flex items-center justify-center w-6 h-6 mt-0.5">
                        <Icon name={logIcon?.name} size={14} color={logIcon?.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-text-primary">
                            {getLogLevelText(log?.level)}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {formatTimestamp(log?.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-text-primary mb-1">
                          {log?.message}
                        </div>
                        {log?.details && (
                          <div className="text-xs text-text-secondary bg-background rounded px-2 py-1 font-mono">
                            {log?.details}
                          </div>
                        )}
                        {log?.fileName && (
                          <div className="text-xs text-text-secondary mt-1">
                            الملف: {log?.fileName}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full mx-auto mb-3">
                  <Icon name="FileText" size={20} color="var(--color-text-secondary)" />
                </div>
                <p className="text-text-secondary">
                  {selectedLogLevel === 'all' ?'لا توجد سجلات متاحة' 
                    : `لا توجد سجلات من نوع "${getLogLevelText(selectedLogLevel)}"`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Log Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="ghost" size="sm" iconName="Download">
                تصدير السجلات
              </Button>
              <Button variant="ghost" size="sm" iconName="Trash2">
                مسح السجلات
              </Button>
            </div>
            <div className="text-xs text-text-secondary">
              آخر تحديث: {formatTimestamp(Date.now())}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingLogs;
