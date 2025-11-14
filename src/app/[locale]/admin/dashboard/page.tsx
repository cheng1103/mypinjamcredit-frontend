'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { exportLeadToPDF, exportLeadsToPDF } from '@/lib/pdfExport';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Lead {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  loanAmount: number;
  loanType: string;
  status: string;
  assignedTo: string | null;
  occupation?: string;
  monthlyIncome?: number;
  location?: string;
  createdAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

interface DailyStats {
  date: string;
  visits: number;
  leads: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'testimonials' | 'settings'>('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loanTypeFilter, setLoanTypeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Date range filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  // Daily stats - mock data for now (你可以从后端 API 获取真实数据)
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/en/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchLeads(token);
    fetchTestimonials(token);
    generateMockDailyStats(); // 临时使用模拟数据
  }, [router]);

  const generateMockDailyStats = () => {
    const stats: DailyStats[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      stats.push({
        date: date.toISOString().split('T')[0],
        visits: Math.floor(Math.random() * 200) + 50,
        leads: Math.floor(Math.random() * 20) + 5,
      });
    }
    setDailyStats(stats);
  };

  const fetchLeads = async (token: string) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBaseUrl}/api/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async (token: string) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBaseUrl}/api/testimonials/moderation`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/en/admin/login');
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBaseUrl}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchLeads(token);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleTestimonialStatusChange = async (testimonialId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBaseUrl}/api/testimonials/${testimonialId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchTestimonials(token);
      }
    } catch (error) {
      console.error('Failed to update testimonial status:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New passwords do not match');
      return;
    }

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBaseUrl}/api/auth/change-password`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (response.ok) {
        setPasswordMessage('Password changed successfully');
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await response.json();
        setPasswordMessage(data.errorKey === 'invalid_old_password' ? 'Invalid old password' : 'Failed to change password');
      }
    } catch (error) {
      setPasswordMessage('Failed to change password');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Occupation', 'Monthly Income', 'Loan Type', 'Loan Amount', 'Location', 'Status', 'Created Date'];
    const csvData = filteredAndSortedLeads.map(lead => [
      lead.fullName,
      lead.phone,
      lead.occupation || 'N/A',
      lead.monthlyIncome ? `RM ${lead.monthlyIncome}` : 'N/A',
      lead.loanType,
      `RM ${lead.loanAmount}`,
      lead.location || 'N/A',
      lead.status,
      new Date(lead.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate analytics
  const analytics = {
    totalLeads: leads.length,
    todayLeads: leads.filter(l => {
      const today = new Date().toDateString();
      return new Date(l.createdAt).toDateString() === today;
    }).length,
    pendingLeads: leads.filter(l => l.status === 'SUBMITTED').length,
    approvedLeads: leads.filter(l => l.status === 'APPROVED').length,
    rejectedLeads: leads.filter(l => l.status === 'REJECTED').length,
    underReviewLeads: leads.filter(l => l.status === 'UNDER_REVIEW').length,
    completedLeads: leads.filter(l => l.status === 'COMPLETED').length,
    totalLoanAmount: leads.reduce((sum, l) => sum + l.loanAmount, 0),
    avgLoanAmount: leads.length > 0 ? leads.reduce((sum, l) => sum + l.loanAmount, 0) / leads.length : 0,
    todayVisits: dailyStats[dailyStats.length - 1]?.visits || 0,
  };

  // Filter and sort leads
  const filteredAndSortedLeads = leads
    .filter(lead => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        lead.fullName.toLowerCase().includes(searchLower) ||
        lead.phone.includes(searchLower) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower)) ||
        (lead.occupation && lead.occupation.toLowerCase().includes(searchLower)) ||
        (lead.location && lead.location.toLowerCase().includes(searchLower));

      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const matchesLoanType = loanTypeFilter === 'ALL' || lead.loanType === loanTypeFilter;

      // Date range filter
      const leadDate = new Date(lead.createdAt);
      const matchesDateRange =
        (!startDate || leadDate >= new Date(startDate)) &&
        (!endDate || leadDate <= new Date(endDate + 'T23:59:59'));

      return matchesSearch && matchesStatus && matchesLoanType && matchesDateRange;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'amount':
          comparison = a.loanAmount - b.loanAmount;
          break;
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredAndSortedLeads.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, loanTypeFilter, sortBy, sortOrder, startDate, endDate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">
                Welcome, <span className="font-medium text-slate-900">{user?.username}</span>
                {user?.role === 'SUPER_ADMIN' && (
                  <span className="ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded">Super Admin</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'leads'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'testimonials'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Testimonials ({testimonials.filter(t => t.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Leads */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Leads</p>
                    <p className="text-3xl font-bold mt-2">{analytics.totalLeads}</p>
                    <p className="text-blue-100 text-xs mt-1">+{analytics.todayLeads} today</p>
                  </div>
                  <svg className="h-12 w-12 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
              </div>

              {/* Today's Visits */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Today's Visits</p>
                    <p className="text-3xl font-bold mt-2">{analytics.todayVisits}</p>
                    <p className="text-purple-100 text-xs mt-1">Page views</p>
                  </div>
                  <svg className="h-12 w-12 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Total Loan Amount */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Loan Amount</p>
                    <p className="text-3xl font-bold mt-2">RM {(analytics.totalLoanAmount / 1000).toFixed(0)}K</p>
                    <p className="text-green-100 text-xs mt-1">Avg: RM {(analytics.avgLoanAmount / 1000).toFixed(1)}K</p>
                  </div>
                  <svg className="h-12 w-12 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-orange-100 text-sm font-medium mb-3">Status Breakdown</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="font-semibold">{analytics.pendingLeads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Under Review:</span>
                        <span className="font-semibold">{analytics.underReviewLeads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approved:</span>
                        <span className="font-semibold">{analytics.approvedLeads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span className="font-semibold">{analytics.completedLeads}</span>
                      </div>
                    </div>
                  </div>
                  <svg className="h-12 w-12 text-orange-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Daily Stats Chart - Recharts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Last 7 Days Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyStats.map(stat => ({
                      ...stat,
                      formattedDate: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="formattedDate"
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#a855f7"
                      style={{ fontSize: '12px' }}
                      label={{ value: 'Visits', angle: -90, position: 'insideLeft', style: { fill: '#a855f7' } }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#3b82f6"
                      style={{ fontSize: '12px' }}
                      label={{ value: 'Leads', angle: 90, position: 'insideRight', style: { fill: '#3b82f6' } }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="line"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="visits"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={{ fill: '#a855f7', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Visits"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="leads"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Leads"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Leads</h3>
              <div className="space-y-3">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{lead.fullName}</p>
                      <p className="text-sm text-slate-600">RM {lead.loanAmount.toLocaleString()} • {lead.loanType}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        lead.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        lead.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Date Range - Start */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Date Range - End */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="ALL">All Status</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                {/* Loan Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Loan Type</label>
                  <select
                    value={loanTypeFilter}
                    onChange={(e) => setLoanTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="ALL">All Types</option>
                    <option value="PERSONAL_USE">Personal Use</option>
                    <option value="BUSINESS_EXPANSION">Business Expansion</option>
                    <option value="EQUIPMENT_FINANCING">Equipment Financing</option>
                    <option value="WORKING_CAPITAL">Working Capital</option>
                    <option value="DEBT_CONSOLIDATION">Debt Consolidation</option>
                  </select>
                </div>
              </div>

              {/* Second Row: Sort By */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'name')}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                      <option value="name">Name</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
                      title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="md:col-span-5 flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStartDate('');
                      setEndDate('');
                      setStatusFilter('ALL');
                      setLoanTypeFilter('ALL');
                      setSortBy('date');
                      setSortOrder('desc');
                    }}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Export and Stats */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-slate-600">
                  Showing {paginatedLeads.length} of {filteredAndSortedLeads.length} leads
                  {filteredAndSortedLeads.length !== leads.length && ` (filtered from ${leads.length} total)`}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    disabled={filteredAndSortedLeads.length === 0}
                  >
                    Export to CSV
                  </button>
                  <button
                    onClick={() => exportLeadsToPDF(filteredAndSortedLeads)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    disabled={filteredAndSortedLeads.length === 0}
                  >
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Name & Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Occupation & Income
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Loan Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {paginatedLeads.length > 0 ? (
                      paginatedLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-900">{lead.fullName}</div>
                            <div className="text-sm text-slate-500">{lead.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-900">{lead.occupation || 'N/A'}</div>
                            {lead.monthlyIncome && (
                              <div className="text-sm text-slate-500">RM {lead.monthlyIncome.toLocaleString()}/mo</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-900">RM {lead.loanAmount.toLocaleString()}</div>
                            <div className="text-sm text-slate-500">{lead.loanType}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-900">{lead.location || 'N/A'}</div>
                            <div className="text-xs text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="text-sm border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="SUBMITTED">Submitted</option>
                              <option value="UNDER_REVIEW">Under Review</option>
                              <option value="APPROVED">Approved</option>
                              <option value="REJECTED">Rejected</option>
                              <option value="COMPLETED">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          No leads found matching your filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1 border rounded text-sm ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            {/* Status Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex gap-4 items-center">
                <div className="text-sm font-medium text-slate-700">Filter:</div>
                <div className="flex gap-2">
                  {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => {
                    const count = status === 'ALL'
                      ? testimonials.length
                      : testimonials.filter(t => t.status === status).length;
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          statusFilter === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid gap-4">
              {testimonials
                .filter(t => statusFilter === 'ALL' || t.status === statusFilter)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                      testimonial.status === 'PENDING'
                        ? 'border-yellow-500'
                        : testimonial.status === 'APPROVED'
                        ? 'border-green-500'
                        : 'border-red-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{testimonial.name}</h3>
                        <p className="text-sm text-slate-500">
                          {new Date(testimonial.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          testimonial.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : testimonial.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {testimonial.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 whitespace-pre-wrap">{testimonial.message}</p>

                    {testimonial.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTestimonialStatusChange(testimonial.id, 'APPROVED')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleTestimonialStatusChange(testimonial.id, 'REJECTED')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}

              {testimonials.filter(t => statusFilter === 'ALL' || t.status === statusFilter).length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center text-slate-500">
                  No testimonials found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
              {passwordMessage && (
                <div className={`px-4 py-3 rounded-lg ${
                  passwordMessage.includes('successfully')
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {passwordMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Full Name</p>
                    <p className="text-sm font-medium text-slate-900">{selectedLead.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Phone Number</p>
                    <p className="text-sm font-medium text-slate-900">{selectedLead.phone}</p>
                  </div>
                  {selectedLead.email && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Email</p>
                      <p className="text-sm font-medium text-slate-900">{selectedLead.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Occupation</p>
                    <p className="text-sm font-medium text-slate-900">{selectedLead.occupation || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Financial Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Monthly Income</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedLead.monthlyIncome ? `RM ${selectedLead.monthlyIncome.toLocaleString()}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Loan Amount Requested</p>
                    <p className="text-sm font-medium text-slate-900">RM {selectedLead.loanAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Loan Type</p>
                    <p className="text-sm font-medium text-slate-900">{selectedLead.loanType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      selectedLead.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      selectedLead.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      selectedLead.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location & Timing */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Location & Timing</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-900">{selectedLead.location || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Submitted On</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedLead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Update Status</h4>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      handleStatusChange(selectedLead.id, e.target.value);
                      setSelectedLead({ ...selectedLead, status: e.target.value });
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="SUBMITTED">Submitted</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                {/* PDF Export Button */}
                <div>
                  <button
                    onClick={() => exportLeadToPDF(selectedLead)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
