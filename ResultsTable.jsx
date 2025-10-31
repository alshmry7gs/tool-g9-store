import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsTable = ({ results, onDownload, onRetry, onBulkDownload }) => {
  const [sortField, setSortField] = useState('processedAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredResults = results?.filter(result => {
    if (filterStatus === 'all') return true;
    return result?.status === filterStatus;
  });

  const sortedResults = [...filteredResults]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'processedAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={16} color="var(--color-success)" />;
      case 'failed':
        return <Icon name="XCircle" size={16} color="var(--color-error)" />;
      case 'processing':
        return <Icon name="Clock" size={16} color="var(--color-warning)" />;
      default:
        return <Icon name="Circle" size={16} color="var(--color-muted-foreground)" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Table Header with Controls */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">معالجة النتائج</h3>
            <p className="text-sm text-text-secondary mt-1">
              {results?.length} ملف تم معالجته
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">جميع الحالات</option>
              <option value="success">نجح</option>
              <option value="failed">فشل</option>
              <option value="processing">قيد المعالجة</option>
            </select>
            
            {/* Bulk Download */}
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={onBulkDownload}
              disabled={!results?.some(r => r?.status === 'success')}
            >
              تحميل الكل
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('originalName')}
                  className="flex items-center gap-2 hover:text-text-primary"
                >
                  الملف الأصلي
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('newName')}
                  className="flex items-center gap-2 hover:text-text-primary"
                >
                  الملف الجديد
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">الحالة</th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('originalSize')}
                  className="flex items-center gap-2 hover:text-text-primary"
                >
                  الحجم
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">FPS</th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('processedAt')}
                  className="flex items-center gap-2 hover:text-text-primary"
                >
                  وقت المعالجة
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults?.map((result) => (
              <tr key={result?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon name="FileVideo" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                      {result?.originalName}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary truncate max-w-[200px] block">
                    {result?.newName}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result?.status)}
                    <span className={`text-sm font-medium ${
                      result?.status === 'success' ? 'text-success' :
                      result?.status === 'failed'? 'text-error' : 'text-warning'
                    }`}>
                      {result?.status === 'success' ? 'نجح' :
                       result?.status === 'failed' ? 'فشل' : 'قيد المعالجة'}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-text-primary">{formatFileSize(result?.originalSize)}</div>
                    {result?.newSize && (
                      <div className="text-text-secondary">→ {formatFileSize(result?.newSize)}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="text-text-primary">{result?.originalFps} fps</div>
                    {result?.newFps && (
                      <div className="text-primary font-medium">→ {result?.newFps} fps</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-secondary">
                    <div>{new Date(result.processedAt)?.toLocaleDateString('ar-SA')}</div>
                    <div>{new Date(result.processedAt)?.toLocaleTimeString('ar-SA')}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {result?.status === 'success' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        onClick={() => onDownload(result)}
                      >
                        تحميل
                      </Button>
                    )}
                    {result?.status === 'failed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="RotateCcw"
                        onClick={() => onRetry(result)}
                      >
                        إعادة المحاولة
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden">
        {sortedResults?.map((result) => (
          <div key={result?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="FileVideo" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-text-primary truncate max-w-[180px]">
                  {result?.originalName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(result?.status)}
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">الملف الجديد:</span>
                <span className="text-text-primary truncate max-w-[150px]">{result?.newName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">الحجم:</span>
                <span className="text-text-primary">
                  {formatFileSize(result?.originalSize)}
                  {result?.newSize && ` → ${formatFileSize(result?.newSize)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">FPS:</span>
                <span className="text-text-primary">
                  {result?.originalFps} fps
                  {result?.newFps && <span className="text-primary font-medium"> → {result?.newFps} fps</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">وقت المعالجة:</span>
                <span className="text-text-primary">
                  {new Date(result.processedAt)?.toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              {result?.status === 'success' && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => onDownload(result)}
                  fullWidth
                >
                  تحميل
                </Button>
              )}
              {result?.status === 'failed' && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={() => onRetry(result)}
                  fullWidth
                >
                  إعادة المحاولة
                </Button>
              )}
            </div>
            
            {result?.status === 'failed' && result?.errorMessage && (
              <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error">{result?.errorMessage}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {sortedResults?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-text-secondary">لا توجد نتائج تطابق المرشح المحدد</p>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
