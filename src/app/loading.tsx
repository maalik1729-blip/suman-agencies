export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0d1017]">
      <div className="flex flex-col items-center gap-4">
        {/* Logo Animation */}
        <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg animate-pulse" 
             style={{ background: "linear-gradient(135deg, #1a2f52, #101d33)" }}>
          <svg viewBox="0 0 100 100" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <text x="50" y="68" fontFamily="'Times New Roman', Times, serif" fontWeight="bold" 
                  fontStyle="italic" fontSize="56" letterSpacing="-2" fill="#e8c97a" textAnchor="middle">
              SA
            </text>
          </svg>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-[#4a6fa5] animate-pulse">
            Loading...
          </p>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#4a6fa5] animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#4a6fa5] animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#4a6fa5] animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
