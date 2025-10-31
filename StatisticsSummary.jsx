import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const StatisticsSummary = ({ statistics }) => {
  const processingTrendData = [
    { month: 'يناير', successful: 45, failed: 5, total: 50 },
    { month: 'فبراير', successful: 52, failed: 8, total: 60 },
    { month: 'مارس', successful: 38, failed: 2, total: 40 },
    { month: 'أبريل', successful: 67, failed: 3, total: 70 },
    { month: 'مايو', successful: 58, failed: 7, total: 65 },
    { month: 'يونيو', successful: 72, failed: 3, total: 75 }
  ];

  const fpsDistributionData = [
    { name: '24 FPS', value: 35, color: '#2563EB' },
    { name: '30 FPS', value: 45, color: '#0EA5E9' },
    { name: '60 FPS', value: 15, color: '#059669' },
    { name: '120 FPS', value: 5, color: '#D97706' }
  ];

  const performanceMetrics = [
    {
      title: 'إجمالي المعالجات',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'Activity'
    },
    {
      title: 'معدل النجاح',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle'
    },
    {
      title: 'متوسط وقت المعالجة',
      value: '3:42',
      change: '-15%',
      changeType: 'positive',
      icon: 'Clock'
    },
    {
      title: 'إجمالي البيانات المعالجة',
      value: '2.4 تيرابايت',
      change: '+28%',
      changeType: 'positive',
      icon: 'HardDrive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics?.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name={metric?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary">{metric?.title}</p>
                  <p className="text-2xl font-bold text-text-primary">{metric?.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={metric?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                />
                <span>{metric?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Trends Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">اتجاهات المعالجة الشهرية</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-text-secondary">ناجح</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-text-secondary">فاشل</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processingTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="successful" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="var(--color-error)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FPS Distribution Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">توزيع معدلات الإطارات</h3>
            <Icon name="PieChart" size={20} color="var(--color-text-secondary)" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fpsDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fpsDistributionData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {fpsDistributionData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-text-secondary">{item?.name}</span>
                <span className="text-sm font-medium text-text-primary">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Success Rate Trend */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">اتجاه معدل النجاح</h3>
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="TrendingUp" size={16} />
            <span>تحسن بنسبة 2.1% هذا الشهر</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processingTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                domain={[80, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  `${((value / (value + processingTrendData?.find(d => d?.successful === value)?.failed || 1)) * 100)?.toFixed(1)}%`,
                  'معدل النجاح'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="successful" 
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: 'var(--color-success)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Activity Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">ملخص النشاط الأخير</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">156</div>
            <div className="text-sm text-text-secondary">معالجات ناجحة اليوم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2.4 ساعة</div>
            <div className="text-sm text-text-secondary">متوسط وقت المعالجة</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">8</div>
            <div className="text-sm text-text-secondary">معالجات قيد التنفيذ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSummary;
