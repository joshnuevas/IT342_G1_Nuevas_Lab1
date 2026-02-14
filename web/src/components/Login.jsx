import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const token = await response.text();

      if (response.ok) {
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        setError("Invalid credentials. Please check your details.");
      }
    } catch {
      setError("Server error. Unable to connect to RentEasy.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#F5F2F0]">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 bg-[#F5F2F0]">
        <div className="w-full max-w-md mx-auto">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#4A3428] rounded-md flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-[#4A3428]">RentEasy</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold text-[#4A3428] mb-3">Welcome back</h2>
            <p className="text-[#8C6A48] text-lg">
              Please enter your details to sign in.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#4A3428] mb-2">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9C826B]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-4 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-[#4A3428]">Password</label>
                <a href="#" className="text-sm font-medium text-[#8C6A48] hover:text-[#4A3428] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9C826B]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-4 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-[#4A3428] hover:bg-[#3E2b22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C6A48] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-[#8C6A48]">Don't have an account? </span>
            <Link to="/register" className="font-semibold text-[#4A3428] hover:underline transition-all">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-[#4A3428] relative overflow-hidden flex-col justify-between p-12 text-[#F5F2F0]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C6A48] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5D4037] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#3E2723] rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-1000"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-[#F5F2F0] rounded-lg flex items-center justify-center">
            <span className="text-[#4A3428] font-bold text-xl">R</span>
          </div>
          <span className="text-2xl font-bold tracking-wide">RentEasy</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Premium Equipment for Professionals.
          </h1>
          <p className="text-[#D0BCA0] text-xl leading-relaxed">
            Experience the seamless way to manage your rentals. Simple, secure, and designed for your workflow.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-[#9C826B] text-sm font-medium">
          <span>© 2024 RentEasy Inc.</span>
          <span className="w-1 h-1 bg-[#9C826B] rounded-full self-center"></span>
          <span>Privacy Policy</span>
          <span className="w-1 h-1 bg-[#9C826B] rounded-full self-center"></span>
          <span>Contact Support</span>
        </div>
      </div>
    </div>
  );
}