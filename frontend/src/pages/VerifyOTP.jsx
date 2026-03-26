import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RefreshCcw, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'admin@hostel.com';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);
    
    // Auto focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const user = await verifyOTP(email, otpValue);
      
      // Dynamic Redirection based on role
      const rolePrefix = user.role.replace('_', '-');
      navigate(`/${rolePrefix}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-inter p-6">
      <div className="w-full max-w-md bg-surface p-10 rounded-[32px] border border-border text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mx-auto mb-8">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h2 className="text-3xl font-poppins font-bold text-text-primary tracking-tight">Security Check</h2>
        <p className="text-text-secondary mt-3 text-sm leading-relaxed px-4">
          We've sent a 6-digit verification code to <span className="text-text-primary font-bold">{email}</span>
        </p>

        {error && (
          <div className="mt-6 p-3 rounded-xl bg-danger/10 border border-danger/20 flex items-center text-danger text-sm text-left">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex justify-center gap-3 my-12">
          {otp.map((data, index) => (
            <input
              className="w-14 h-16 border border-border/60 bg-background rounded-2xl text-center text-2xl font-poppins font-bold focus:border-accent focus:bg-surface focus:ring-8 focus:ring-accent/10 outline-none transition-all text-text-primary shadow-sm hover:border-accent/30"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !otp[index] && index > 0) {
                  e.target.previousSibling.focus();
                }
              }}
            />
          ))}
        </div>

        <button 
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-4.5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-hover transition-all transform active:scale-[0.98] flex items-center justify-center group mb-8 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-accent/20"
        >
          {loading ? 'Verifying Identity...' : 'Verify and Continue'}
          {!loading && <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" />}
        </button>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center text-sm font-medium">
            {timer > 0 ? (
              <span className="text-text-secondary/80">Resend code in <span className="text-accent font-bold ml-1">0:{timer < 10 ? `0${timer}` : timer}</span></span>
            ) : (
              <button className="text-accent font-bold hover:text-accent-hover transition-colors flex items-center">
                <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                Resend Verification Code
              </button>
            )}
          </div>
          <button className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-[0.2em] hover:text-text-primary transition-all duration-300 py-2">
            Try another method
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-[-10%] left-[-5%] w-[30%] h-[30%] bg-accent/5 blur-[100px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple/5 blur-[100px] -z-10 animate-pulse"></div>
    </div>
  );
};

export default VerifyOTP;
