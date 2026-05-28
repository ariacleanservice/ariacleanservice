import { Shield, ArrowLeft, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export default function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn" id="privacy-policy-container">
      <button
        onClick={onBackToHome}
        className="group flex items-center gap-2 font-sans text-xs tracking-widest uppercase font-bold text-[#7A7A7A] hover:text-[#2D2D2D] transition-colors mb-10 cursor-pointer min-h-[48px]"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Return to Sanctuary Booking
      </button>

      <div className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-3xl p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-left">
        <div className="flex items-center gap-3 text-[#A8B5A2] mb-4">
          <Shield className="w-6 h-6" />
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold">Trust & Integrity</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2D2D2D] mb-2 leading-tight">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-[#7A7A7A] italic mb-8">
          Last updated: May 26, 2026
        </p>

        <div className="prose prose-stone max-w-none space-y-8 font-sans text-[#4D4D4D] text-sm leading-relaxed font-light">
          
          <div className="border-b border-[#FAF9F5] pb-6">
            <h2 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
              <span className="text-[#A8B5A2]">1.</span> Commitment to Confidentiality
            </h2>
            <p>
              At Aria Clean Service, your sanctuary is of the utmost importance. We respect your physical boundaries and your digital presence. This Privacy Policy details how we collect, store, and utilize essential operational data when utilizing our premium residential reservation system.
            </p>
          </div>

          <div className="border-b border-[#FAF9F5] pb-6">
            <h2 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
              <span className="text-[#A8B5A2]">2.</span> Information We Collect
            </h2>
            <p className="mb-3">
              To curate our signature luxury cleaning experiences, we require specific residential coordinates and contact profiles:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-[#7A7A7A]">
              <li><strong className="text-[#2D2D2D]">Identity Profile:</strong> Full name, telephone coordinates, and verified email address.</li>
              <li><strong className="text-[#2D2D2D]">Sanctuary Address:</strong> Physical location details, access notes, gated entrance codes, and lockbox combinations.</li>
              <li><strong className="text-[#2D2D2D]">Service Sizing details:</strong> Exact residence square footage layout, specialized premium additions (e.g., inside refrigerators, ovens, or organizer zones).</li>
              <li><strong className="text-[#2D2D2D]">Secure Payment Details:</strong> Financial transactions are processed via standard PCI-DSS compliant third-party processors. No raw credit card digits are stored in our native servers.</li>
            </ul>
          </div>

          <div className="border-b border-[#FAF9F5] pb-6">
            <h2 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
              <span className="text-[#A8B5A2]">3.</span> Utilization of Information
            </h2>
            <p>
              Your personal specifications are solely deployed to operationalize bookings, dispatch our fully vetted bonded technicians, process standard invoicing, and communicate key service alterations. We strictly forbid selling, publishing, or renting your profile information to external databases or third-party marketing entities.
            </p>
          </div>

          <div className="border-b border-[#FAF9F5] pb-6">
            <h2 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
              <span className="text-[#A8B5A2]">4.</span> Vetted Team Security Safeguards
            </h2>
            <p>
              Only authorized staff members involved with organizing or executing your clean session are given selective access to your physical property notes. All sensitive security specifications, gates keys, and entry details are safely encrypted behind modern, multi-factor cloud authentication locks.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
              <span className="text-[#A8B5A2]">5.</span> Your Privacy Stewardship Rights
            </h2>
            <p>
              At any point, you hold the legal authority to command our operations office to update, purge, or retrieve your profile coordinates, lock logs, and personal service attributes. To exercise these properties, simply draft an email directly to our support department.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#7A7A7A]">
            <Lock className="w-4 h-4 text-[#A8B5A2]" />
            <span>Secure 256-Bit SSL Data Encryption</span>
          </div>
          <button
            onClick={onBackToHome}
            className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040] text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            Agree & Return
          </button>
        </div>
      </div>
    </div>
  );
}
