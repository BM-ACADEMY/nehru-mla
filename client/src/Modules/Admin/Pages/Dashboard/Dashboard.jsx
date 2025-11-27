import React from "react";
import { HiUsers, HiNewspaper, HiPhotograph, HiArrowUp, HiArrowRight } from "react-icons/hi";

const Dashboard = () => {
  
  // Example data structure for stats
  const stats = [
    { title: "Total Users", count: 120, icon: <HiUsers />, color: "bg-blue-50 text-blue-600", trend: "+12%" },
    { title: "Total Blogs", count: 34, icon: <HiNewspaper />, color: "bg-green-50 text-green-600", trend: "+5%" },
    { title: "Gallery Images", count: 89, icon: <HiPhotograph />, color: "bg-purple-50 text-purple-600", trend: "+20%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
           <p className="text-gray-500 text-sm mt-1">Welcome back to NMK Admin Panel</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">View Reports</button>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.count}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-xl`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-green-600 font-semibold flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                <HiArrowUp className="mr-1" /> {stat.trend}
              </span>
              <span className="text-gray-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h2>
            <ul className="space-y-4">
              {[
                { text: "New blog post published: 'Community Guidelines'", time: "2 hours ago", type: "blog" },
                { text: "Gallery updated with 3 new images", time: "5 hours ago", type: "image" },
                { text: "New membership inquiry received", time: "1 day ago", type: "user" },
              ].map((activity, i) => (
                <li key={i} className="flex items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                    activity.type === 'blog' ? 'bg-green-500' : activity.type === 'image' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 text-center text-sm text-gray-500 hover:text-black py-2 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition">
                View All History
            </button>
          </div>
          
          {/* Placeholder for another widget (e.g. Quick Actions) */}
          <div className="bg-[#F7E27A] rounded-xl shadow-sm p-6 text-gray-900 relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2">Need Help?</h2>
                <p className="text-sm opacity-90 mb-6 max-w-xs">Check out the documentation to learn how to manage the gallery and memberships effectively.</p>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                    Read Documentation
                </button>
             </div>
             {/* Decorative Circle */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;