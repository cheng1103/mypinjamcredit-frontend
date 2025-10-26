'use client';

export function TrustBadges() {
  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">800+</div>
          <div className="text-xs text-slate-600 mt-1">Loans Approved</div>
        </div>
        <div className="text-center border-x border-green-200">
          <div className="text-3xl font-bold text-green-600">RM12M+</div>
          <div className="text-xs text-slate-600 mt-1">Disbursed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">4.7/5</div>
          <div className="text-xs text-slate-600 mt-1">Customer Rating</div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-4">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-slate-700">SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
          </svg>
          <span className="text-xs font-medium text-slate-700">PDPA Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-slate-700">BNM Licensed</span>
        </div>
      </div>

      {/* Urgency Indicator */}
      <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <svg className="h-5 w-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-800">Fast Response Time</div>
            <div className="text-xs text-slate-600">8 applications submitted today. Average response: 3-4 hours</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <div className="flex-1 text-xs">
            <div className="font-semibold text-slate-800 mb-2">Recent Approvals (This Week)</div>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center justify-between">
                <span>Ahmad K. - Selangor</span>
                <span className="font-medium text-green-600">RM8,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Siti N. - Johor</span>
                <span className="font-medium text-green-600">RM12,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>David T. - KL</span>
                <span className="font-medium text-green-600">RM15,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
