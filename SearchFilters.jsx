import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchFilters = ({ onSearch, onFilter, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [fpsFilter, setFpsFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [fileSizeFilter, setFileSizeFilter] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    const filters = {
      searchTerm,
      dateRange,
      status: statusFilter,
      fps: fpsFilter,
      duration: durationFilter,
      fileSize: fileSizeFilter
    };
    onSearch(filters);
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setStatusFilter('');
    setFpsFilter('');
    setDurationFilter('');
    setFileSizeFilter('');
    onClearFilters();
  };

  const statusOptions = [
    { value: '', label: 'جميع الحالات' },
    { value: 'مكتمل', label: 'مكتمل' },
    { value: 'فشل', label: 'فشل' },
    { value: 'جزئي', label: 'جزئي' }
  ];

  const fpsOptions = [
    { value: '', label: 'جميع معدلات الإطارات' },
    { value: '24', label: '24 FPS' },
    { value: '30', label: '30 FPS' },
    { value: '60', label: '60 FPS' },
    { value: '120', label: '120 FPS' }
  ];

  const durationOptions = [
    { value: '', label: 'جميع المدد' },
    { value: '0-60', label: 'أقل من دقيقة' },
    { value: '60-300', label: '1-5 دقائق' },
    { value: '300-900', label: '5-15 دقيقة' },
    { value: '900+', label: 'أكثر من 15 دقيقة' }
  ];

  const fileSizeOptions = [
    { value: '', label: 'جميع الأحجام' },
    { value: '0-100', label: 'أقل من 100 ميجا' },
    { value: '100-500', label: '100-500 ميجا' },
    { value: '500-1000', label: '500 ميجا - 1 جيجا' },
    { value: '1000+', label: 'أكثر من 1 جيجا' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="البحث في اسم المجموعة، اسم الملف، أو المعاملات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="default"
              iconName="Search"
              iconPosition="right"
            >
              بحث
            </Button>
            <Button
              type="button"
              variant="outline"
              iconName="Filter"
              iconPosition="right"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              فلاتر متقدمة
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statusOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>

          <Input
            type="date"
            placeholder="من تاريخ"
            value={dateRange?.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
            className="w-auto"
          />

          <Input
            type="date"
            placeholder="إلى تاريخ"
            value={dateRange?.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
            className="w-auto"
          />

          {(searchTerm || dateRange?.start || dateRange?.end || statusFilter || fpsFilter || durationFilter || fileSizeFilter) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="right"
              onClick={handleClearAll}
            >
              مسح الفلاتر
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="text-sm font-medium text-text-primary mb-3">فلاتر متقدمة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  معدل الإطارات
                </label>
                <select
                  value={fpsFilter}
                  onChange={(e) => setFpsFilter(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {fpsOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  مدة المعالجة
                </label>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {durationOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  حجم الملف
                </label>
                <select
                  value={fileSizeFilter}
                  onChange={(e) => setFileSizeFilter(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {fileSizeOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilters;
