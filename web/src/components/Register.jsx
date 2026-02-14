import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, Loader2, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.text();

      if (response.ok && data === "User registered successfully") {
        setStatus({ type: "success", message: "Account created! Redirecting..." });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setStatus({ type: "error", message: data || "Registration failed. Please try again." });
      }
    } catch {
      setStatus({ type: "error", message: "Server error. Could not connect." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#F5F2F0]">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 bg-[#F5F2F0] py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#4A3428] rounded-md flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-[#4A3428]">RentEasy</span>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#4A3428] mb-3">Create Account</h2>
            <p className="text-[#8C6A48] text-lg">
              Join us to start your rental journey.
            </p>
          </div>

          {status.message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#4A3428] mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9C826B]" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3.5 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4A3428] mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9C826B]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3.5 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4A3428] mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9C826B]" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3.5 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#4A3428] mb-1">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-[#9C826B]" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-3.5 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none text-sm"
                    placeholder="+123..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4A3428] mb-1">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-[#9C826B]" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-3.5 bg-white border border-[#D0BCA0] rounded-xl focus:ring-2 focus:ring-[#8C6A48] focus:border-[#8C6A48] placeholder-[#B59A7F] text-[#4A3428] transition-all outline-none text-sm"
                    placeholder="City..."
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-[#4A3428] hover:bg-[#3E2b22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C6A48] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-[#8C6A48]">Already have an account? </span>
            <Link to="/login" className="font-semibold text-[#4A3428] hover:underline transition-all">
              Sign in
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
            Join the Community.
          </h1>
          <p className="text-[#D0BCA0] text-xl leading-relaxed">
            Create an account to browse thousands of tools and manage your projects efficiently.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-[#9C826B] text-sm font-medium">
          <span>© 2026 RentEasy Inc.</span>
          <span className="w-1 h-1 bg-[#9C826B] rounded-full self-center"></span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  );
}