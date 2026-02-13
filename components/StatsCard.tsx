
interface StatsCardProps {
  title: string;
  value: string;
  link: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export default function StatsCard({ title, value, link, icon, iconBg, iconColor }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-xl ${iconColor}`}></i>
        </div>
      </div>
      <button className="text-red-600 text-sm font-medium hover:text-red-700 cursor-pointer">
        {link}
      </button>
    </div>
  );
}
