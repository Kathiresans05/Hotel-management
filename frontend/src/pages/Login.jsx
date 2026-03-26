import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.response?.data?.message || t('LOGIN_FAILED'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface font-inter">
      {/* Left Panel: Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple blur-[100px]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-xl">H</div>
            <span className="text-2xl font-poppins font-bold text-white tracking-tight">HOSTEL<span className="text-accent">PRO</span></span>
          </div>

          <h1 className="text-5xl font-poppins font-bold text-white leading-tight mb-6">
            Property management <br />
            <span className="text-accent">reimagined</span> for scale.
          </h1>
          <p className="text-white/60 text-lg max-w-md leading-relaxed">
            The all-in-one operating system for modern hostels and lodges. Real-time insights, automated billing, and seamless guest experiences.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 max-w-lg pb-12">
          {[
            { label: 'Total Rooms', value: '450+', desc: 'Managed globally' },
            { label: 'Uptime', value: '99.9%', desc: 'Enterprise reliability' },
            { label: 'Support', value: '24/7', desc: 'Dedicated account team' },
            { label: 'Efficiency', value: '40%', desc: 'Reduced overheads' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-accent font-bold text-2xl">{stat.value}</p>
              <p className="text-white font-medium text-sm mt-1">{stat.label}</p>
              <p className="text-white/40 text-[11px] uppercase tracking-widest mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 pt-12 border-t border-white/10 flex items-center justify-between text-white/40 text-xs">
          <span>© 2024 HostelPro Systems Inc.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-background/30">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-10">
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold">H</div>
              <span className="text-xl font-poppins font-bold text-primary tracking-tight">HOSTEL<span className="text-accent">PRO</span></span>
            </div>
            <h2 className="text-3xl font-poppins font-bold text-text-primary tracking-tight">{t('WELCOME_BACK')}</h2>
            <p className="text-text-secondary mt-2 text-sm">{t('LOGIN_SUBTITLE')}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 flex items-center text-danger text-sm">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">{t('EMAIL_ADDRESS')}</label>
              <div className="relative group">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hostel.com" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-input text-text-primary focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm text-text-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">{t('PASSWORD')}</label>
                <a href="#" className="text-[10px] font-bold text-accent uppercase hover:underline">{t('FORGOT_PASSWORD')}</a>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full pl-11 pr-12 py-3 bg-surface border border-border rounded-input text-text-primary focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm text-text-primary"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-border text-accent focus:ring-accent/20" />
              <label htmlFor="remember" className="text-sm text-text-secondary">{t('REMEMBER_ME')}</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-button hover:bg-primary-dark transition-all transform active:scale-[0.98] flex items-center justify-center group disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? t('AUTHENTICATING') : t('SIGN_IN_BTN')}
              {!loading && <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border/60">
            <div className="p-4 bg-surface border border-border rounded-2xl flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">{t('ENVIRONMENT_PRODUCTION')}</p>
                <p className="text-[10px] text-text-secondary italic">{t('SECURE_CONNECTION')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
