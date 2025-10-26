'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  createdAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'testimonials' | 'settings'>('leads');

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loanTypeFilter, setLoanTypeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
  }, [router]);

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
    const headers = ['Name', 'Email', 'Phone', 'Loan Type', 'Loan Amount', 'Status', 'Created Date'];
    const csvData = filteredAndSortedLeads.map(lead => [
      lead.fullName,
      lead.email || 'N/A',
      lead.phone,
      lead.loanType,
      lead.loanAmount,
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

  // Filter and sort leads
  const filteredAndSortedLeads = leads
    .filter(lead => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        lead.fullName.toLowerCase().includes(searchLower) ||
        lead.phone.includes(searchLower) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower));

      // Status filter
      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;

      // Loan type filter
      const matchesLoanType = loanTypeFilter === 'ALL' || lead.loanType === loanTypeFilter;

      return matchesSearch && matchesStatus && matchesLoanType;
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
  }, [searchTerm, statusFilter, loanTypeFilter, sortBy, sortOrder]);

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
      <header className="bg-white shadow-sm">
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
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'leads'
                ? 'border-b-2 border-slate-800 text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'testimonials'
                ? 'border-b-2 border-slate-800 text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Testimonials ({testimonials.filter(t => t.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'border-b-2 border-slate-800 text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 text-sm"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 text-sm"
                  >
                    <option value="ALL">All Types</option>
                    <option value="PERSONAL_LOAN">Personal Loan</option>
                    <option value="BUSINESS_LOAN">Business Loan</option>
                    <option value="HOME_LOAN">Home Loan</option>
                    <option value="CAR_LOAN">Car Loan</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'name')}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 text-sm"
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
              </div>

              {/* Export and Stats */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-slate-600">
                  Showing {paginatedLeads.length} of {filteredAndSortedLeads.length} leads
                  {filteredAndSortedLeads.length !== leads.length && ` (filtered from ${leads.length} total)`}
                </div>
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
                  disabled={filteredAndSortedLeads.length === 0}
                >
                  Export to CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Loan Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {paginatedLeads.length > 0 ? (
                      paginatedLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{lead.fullName}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-900">{lead.phone}</div>
                            {lead.email && <div className="text-sm text-slate-500">{lead.email}</div>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-900">RM {lead.loanAmount.toLocaleString()}</div>
                            <div className="text-sm text-slate-500">{lead.loanType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="text-sm border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500"
                            >
                              <option value="SUBMITTED">Submitted</option>
                              <option value="UNDER_REVIEW">Under Review</option>
                              <option value="APPROVED">Approved</option>
                              <option value="REJECTED">Rejected</option>
                              <option value="COMPLETED">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
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
                                ? 'bg-slate-800 text-white border-slate-800'
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
                            ? 'bg-slate-800 text-white'
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
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
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
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
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
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
