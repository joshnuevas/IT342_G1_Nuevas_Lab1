import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  TrendingUp, 
  ShoppingBag, 
  Clock 
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#F5F2F0] font-sans text-[#4A3428]">
      
      <aside className="w-64 bg-[#4A3428] text-[#F5F2F0] flex flex-col fixed h-full transition-all duration-300">
        
        <div className="h-20 flex items-center px-8 border-b border-[#5D4037]">
          <div className="w-8 h-8 bg-[#F5F2F0] rounded-lg flex items-center justify-center mr-3">
            <span className="text-[#4A3428] font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-bold tracking-wide">RentEasy</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<ShoppingBag size={20} />} label="Rentals" />
          <NavItem icon={<Package size={20} />} label="Inventory" />
          <NavItem icon={<Users size={20} />} label="Customers" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-[#5D4037]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-[#D0BCA0] hover:bg-[#5D4037] hover:text-white rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 flex flex-col">
        
        <header className="h-20 bg-[#FDFBF9] border-b border-[#EBE5E0] flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-[#4A3428]">Dashboard</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C826B] w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-[#F5F2F0] border border-transparent focus:border-[#D0BCA0] focus:bg-white rounded-lg text-sm text-[#4A3428] outline-none transition-all w-64"
              />
            </div>

            <button className="relative p-2 text-[#8C6A48] hover:bg-[#F5F2F0] rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="w-10 h-10 bg-[#D0BCA0] rounded-full flex items-center justify-center text-[#4A3428] font-bold border-2 border-white shadow-sm cursor-pointer">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          
          <div>
            <h2 className="text-3xl font-bold text-[#4A3428]">Welcome back, John!</h2>
            <p className="text-[#8C6A48] mt-1">Here's what's happening with your rentals today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Revenue" 
              value="$12,450" 
              change="+15%" 
              icon={<TrendingUp className="text-green-600" />} 
            />
            <StatCard 
              title="Active Rentals" 
              value="45" 
              change="+5" 
              icon={<ShoppingBag className="text-blue-600" />} 
            />
            <StatCard 
              title="Pending Returns" 
              value="12" 
              change="-2" 
              icon={<Clock className="text-orange-500" />} 
            />
            <StatCard 
              title="New Customers" 
              value="28" 
              change="+12%" 
              icon={<Users className="text-[#4A3428]" />} 
            />
          </div>

          <div className="bg-[#FDFBF9] rounded-2xl shadow-sm border border-[#EBE5E0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#4A3428]">Recent Rentals</h3>
              <button className="text-sm font-semibold text-[#8C6A48] hover:text-[#4A3428]">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs font-semibold text-[#8C6A48] uppercase tracking-wider border-b border-[#EBE5E0]">
                  <tr>
                    <th className="pb-3 pl-4">Item Name</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right pr-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-[#4A3428] divide-y divide-[#F5F2F0]">
                  <TableRow item="Canon EOS R5" user="Sarah M." status="Active" date="Oct 24, 2024" amount="$120.00" />
                  <TableRow item="DJI Mavic 3" user="Mike Ross" status="Pending" date="Oct 23, 2024" amount="$85.00" />
                  <TableRow item="Sony A7III Kit" user="Jessica P." status="Returned" date="Oct 21, 2024" amount="$200.00" />
                  <TableRow item="Godox Light Set" user="Harvey S." status="Active" date="Oct 20, 2024" amount="$60.00" />
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? "bg-[#5D4037] text-white shadow-md" 
          : "text-[#D0BCA0] hover:bg-[#5D4037] hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-[#FDFBF9] p-6 rounded-2xl border border-[#EBE5E0] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F5F2F0] rounded-lg">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-[#8C6A48] text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-[#4A3428] mt-1">{value}</p>
    </div>
  );
}

function TableRow({ item, user, status, date, amount }) {
  const statusColors = {
    Active: "bg-blue-100 text-blue-700",
    Pending: "bg-orange-100 text-orange-700",
    Returned: "bg-green-100 text-green-700",
  };

  return (
    <tr className="hover:bg-[#F5F2F0] transition-colors">
      <td className="py-4 pl-4">{item}</td>
      <td className="py-4">{user}</td>
      <td className="py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[status] || "bg-gray-100 text-gray-700"}`}>
          {status}
        </span>
      </td>
      <td className="py-4 text-[#8C6A48]">{date}</td>
      <td className="py-4 text-right pr-4">{amount}</td>
    </tr>
  );
}