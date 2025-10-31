import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingHistory = ({ history, onViewDetails, onClearHistory }) => {
  const [expandedSession, setExpandedSession] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('ar-SA'),
      time: date?.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}د ${secs}ث`;
  };

  const getSessionStatusIcon = (session) => {
    const successRate = (session?.successfulFiles / session?.totalFiles) * 100;
    if (successRate === 100) {
      return <Icon name="CheckCircle" size={16} color="var(--color-success)" />;
    } else if (successRate >= 50) {
      return <Icon name="AlertCircle" size={16} color="var(--color-warning)" />;
    } else {
      return <Icon name="XCircle" size={16} color="var(--color-error)" />;
    }
  };

  const getSessionStatusText = (session) => {
    const successRate = (session?.successfulFiles / session?.totalFiles) * 100;
    if (successRate === 100) return 'مكتمل بنجاح';
    if (successRate >= 50) return 'مكتمل جزئياً';
    return 'فشل';
  };

  const toggleExpanded = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Icon name="History" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">سجل المعالجة</h3>
              <p className="text-sm text-text-secondary">
                {history?.length} جلسة معالجة سابقة
              </p>
            </div>
          </div>
          
          {history?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={onClearHistory}
            >
              مسح السجل
            </Button>
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {history?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Clock" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-text-secondary">لا يوجد سجل معالجة سابق</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {history?.map((session) => {
              const { date, time } = formatDate(session?.startedAt);
              const isExpanded = expandedSession === session?.id;
              
              return (
                <div key={session?.id} className="p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => toggleExpanded(session?.id)}
                  >
                    <div className="flex items-center gap-3">
                      {getSessionStatusIcon(session)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-text-primary">
                            جلسة معالجة - {date}
                          </span>
                          <span className="text-xs text-text-secondary">{time}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-text-secondary">
                            {session?.totalFiles} ملف
                          </span>
                          <span className="text-xs text-text-secondary">
                            {formatDuration(session?.processingTime)}
                          </span>
                          <span className={`text-xs font-medium ${
                            session?.successfulFiles === session?.totalFiles 
                              ? 'text-success' 
                              : session?.successfulFiles > 0 
                                ? 'text-warning' :'text-error'
                          }`}>
                            {getSessionStatusText(session)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onViewDetails(session);
                        }}
                      >
                        عرض التفاصيل
                      </Button>
                      <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        color="var(--color-text-secondary)" 
                      />
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-surface rounded-lg border border-border">
                          <div className="text-lg font-bold text-success">{session?.successfulFiles}</div>
                          <div className="text-xs text-text-secondary">ملفات ناجحة</div>
                        </div>
                        <div className="text-center p-3 bg-surface rounded-lg border border-border">
                          <div className="text-lg font-bold text-error">{session?.failedFiles}</div>
                          <div className="text-xs text-text-secondary">ملفات فاشلة</div>
                        </div>
                        <div className="text-center p-3 bg-surface rounded-lg border border-border">
                          <div className="text-lg font-bold text-primary">
                            {Math.round((session?.successfulFiles / session?.totalFiles) * 100)}%
                          </div>
                          <div className="text-xs text-text-secondary">معدل النجاح</div>
                        </div>
                      </div>

                      {/* Processing Parameters */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-text-primary">معاملات المعالجة:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">FPS المستهدف:</span>
                            <span className="text-text-primary font-medium">{session?.targetFps} fps</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">نوع المعالجة:</span>
                            <span className="text-text-primary font-medium">{session?.processingType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">جودة الإخراج:</span>
                            <span className="text-text-primary font-medium">{session?.outputQuality}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">ضغط الملف:</span>
                            <span className="text-text-primary font-medium">
                              {session?.compressionEnabled ? 'مفعل' : 'معطل'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Error Summary */}
                      {session?.failedFiles > 0 && session?.errorSummary && (
                        <div className="mt-4 p-3 bg-error/5 border border-error/20 rounded-lg">
                          <h5 className="text-sm font-semibold text-error mb-2">أخطاء المعالجة:</h5>
                          <ul className="text-sm text-text-secondary space-y-1">
                            {session?.errorSummary?.map((error, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Icon name="AlertCircle" size={12} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingHistory;
