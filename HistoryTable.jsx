import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoryTable = ({ historyData, onReprocess, onExportLogs, onDeleteEntry }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedEntries, setSelectedEntries] = useState(new Set());

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedEntries);
    if (newSelected?.has(id)) {
      newSelected?.delete(id);
    } else {
      newSelected?.add(id);
    }
    setSelectedEntries(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedEntries?.size === historyData?.length) {
      setSelectedEntries(new Set());
    } else {
      setSelectedEntries(new Set(historyData.map(entry => entry.id)));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل':
        return 'text-success bg-success/10';
      case 'فشل':
        return 'text-error bg-error/10';
      case 'جزئي':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted/50 px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedEntries?.size === historyData?.length && historyData?.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-text-primary">
              تحديد الكل ({selectedEntries?.size} محدد)
            </span>
          </div>
          {selectedEntries?.size > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="right"
                onClick={() => onExportLogs(Array.from(selectedEntries))}
              >
                تصدير السجلات
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="right"
                onClick={() => onDeleteEntry(Array.from(selectedEntries))}
              >
                حذف المحدد
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                التاريخ والوقت
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                اسم المجموعة
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                عدد الملفات
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                معدل النجاح
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                مدة المعالجة
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                الحالة
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {historyData?.map((entry) => (
              <React.Fragment key={entry?.id}>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedEntries?.has(entry?.id)}
                        onChange={() => toggleSelection(entry?.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <div className="text-sm">
                        <div className="font-medium text-text-primary">{entry?.date}</div>
                        <div className="text-text-secondary">{entry?.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">{entry?.batchName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{entry?.filesCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-text-primary">
                        {entry?.successRate}%
                      </div>
                      <div className="mr-2 w-16 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            entry?.successRate >= 90 ? 'bg-success' :
                            entry?.successRate >= 70 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${entry?.successRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {formatDuration(entry?.processingDuration)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entry?.status)}`}>
                      {entry?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={expandedRows?.has(entry?.id) ? "ChevronUp" : "ChevronDown"}
                        onClick={() => toggleRowExpansion(entry?.id)}
                      >
                        التفاصيل
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="RotateCcw"
                        onClick={() => onReprocess(entry)}
                      >
                        إعادة معالجة
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedRows?.has(entry?.id) && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 bg-muted/20">
                      <div className="space-y-4">
                        {/* Processing Parameters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium text-text-primary mb-2">معاملات المعالجة</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-text-secondary">FPS الأصلي:</span>
                                <span className="text-text-primary">{entry?.originalFps}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">FPS الجديد:</span>
                                <span className="text-text-primary">{entry?.targetFps}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">تعديل البيانات الوصفية:</span>
                                <span className="text-text-primary">{entry?.metadataChanges}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium text-text-primary mb-2">إحصائيات المعالجة</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-text-secondary">الملفات الناجحة:</span>
                                <span className="text-success">{entry?.successfulFiles}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">الملفات الفاشلة:</span>
                                <span className="text-error">{entry?.failedFiles}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">إجمالي الحجم:</span>
                                <span className="text-text-primary">{entry?.totalSize}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium text-text-primary mb-2">معلومات إضافية</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-text-secondary">وقت البداية:</span>
                                <span className="text-text-primary">{entry?.startTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">وقت الانتهاء:</span>
                                <span className="text-text-primary">{entry?.endTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">المعالج:</span>
                                <span className="text-text-primary">{entry?.processor}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* File Details */}
                        {entry?.fileDetails && entry?.fileDetails?.length > 0 && (
                          <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium text-text-primary mb-3">تفاصيل الملفات</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-border">
                                    <th className="text-right py-2 text-text-secondary">اسم الملف</th>
                                    <th className="text-right py-2 text-text-secondary">الحالة</th>
                                    <th className="text-right py-2 text-text-secondary">الحجم</th>
                                    <th className="text-right py-2 text-text-secondary">الإجراءات</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {entry?.fileDetails?.map((file, index) => (
                                    <tr key={index} className="border-b border-border/50">
                                      <td className="py-2 text-text-primary">{file?.name}</td>
                                      <td className="py-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(file?.status)}`}>
                                          {file?.status}
                                        </span>
                                      </td>
                                      <td className="py-2 text-text-primary">{file?.size}</td>
                                      <td className="py-2">
                                        {file?.status === 'مكتمل' && (
                                          <Button
                                            variant="ghost"
                                            size="xs"
                                            iconName="Download"
                                            iconPosition="right"
                                          >
                                            تحميل
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Error Logs */}
                        {entry?.errorLogs && entry?.errorLogs?.length > 0 && (
                          <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                            <h4 className="font-medium text-error mb-3 flex items-center">
                              <Icon name="AlertTriangle" size={16} className="ml-2" />
                              سجلات الأخطاء
                            </h4>
                            <div className="space-y-2">
                              {entry?.errorLogs?.map((log, index) => (
                                <div key={index} className="text-sm text-error bg-error/10 p-2 rounded">
                                  {log}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
