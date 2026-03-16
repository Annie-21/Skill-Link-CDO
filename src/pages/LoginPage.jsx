import { LogIn, Eye, EyeOff, AlertCircle, Wrench } from "lucide-react";
import { useLogin } from "../hooks/useLogin";

function LoginPage({ onLogin }) {
  const {
    email,        setEmail,
    password,     setPassword,
    showPassword, setShowPassword,
    error,
    isLoading,
    clearError,
    handleSubmit,
  } = useLogin(onLogin);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1f4e79] rounded-2xl mb-4">
            <Wrench size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1f4e79]">Skill-Link CDO</h1>
          <p className="text-sm text-gray-500 mt-1">
            Barangay Bulua — Skilled Worker Registry
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-400 mb-6">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                required
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  required
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-[#2e75b6] focus:ring-2 focus:ring-blue-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1f4e79] text-white font-bold rounded-lg hover:bg-[#2e75b6] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="text-sm">Signing in...</span>
              ) : (
                <>
                  <LogIn size={17} />
                  <span>Sign In</span>
                </>
              )}
            </button>

          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
              Demo accounts
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-500">
              <span><strong className="text-gray-600">Worker:</strong> worker@skilllink.com / worker123</span>
              <span><strong className="text-gray-600">Resident:</strong> resident@skilllink.com / resident123</span>
              <span><strong className="text-gray-600">Admin:</strong> admin@skilllink.com / admin123</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
