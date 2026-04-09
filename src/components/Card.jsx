import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

function Card({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "from-purple-600 to-blue-600",
  trend,
  trendPositive = true,
  onClick,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`relative group p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-15 transition-opacity`}
      ></div>

      {/* Glassmorphism Border */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-2xl transition-all"></div>

      {/* Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-xl rounded-2xl"></div>

      {/* Dark Background */}
      <div className="absolute inset-0 bg-slate-900/40 rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">{title}</h3>
          </div>
          {Icon && (
            <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity shadow-lg`}>
              <Icon className="text-white" size={20} />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
            {value}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>

        {/* Trend */}
        {trend && (
          <div className={`flex items-center gap-2 text-xs font-semibold ${
            trendPositive ? "text-green-400" : "text-red-400"
          }`}>
            {trendPositive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            <span>{trend} from last week</span>
          </div>
        )}
      </div>

      {/* Animated Border on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-5`}></div>
      </div>

      {/* Hover Glow */}
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur transition-all -z-10 group-hover:scale-110 duration-300`}></div>
    </div>
  );
}

export default Card;
