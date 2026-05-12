export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0d1017]">
      <div className="flex flex-col items-center gap-4">
        {/* Modern Home Logo Animation */}
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse" 
             style={{ 
               background: "linear-gradient(135deg, #4a6fa5 0%, #2d4f7c 100%)",
               boxShadow: "0 8px 24px rgba(74, 111, 165, 0.5)"
             }}>
          <svg viewBox="0 0 100 100" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            {/* House Icon */}
            <path d="M 50 25 L 75 42 L 75 45 L 25 45 L 25 42 Z" fill="#ffffff" opacity="0.95"/>
            <rect x="30" y="45" width="40" height="35" rx="2" fill="#ffffff" opacity="0.95"/>
            <rect x="44" y="60" width="12" height="20" rx="1" fill="#4a6fa5"/>
            <circle cx="52" cy="70" r="1" fill="#ffffff"/>
            {/* Windows */}
            <rect x="33" y="50" width="9" height="9" rx="1" fill="#6b8fc4"/>
            <rect x="58" y="50" width="9" height="9" rx="1" fill="#6b8fc4"/>
            <line x1="37.5" y1="50" x2="37.5" y2="59" stroke="#ffffff" strokeWidth="0.5"/>
            <line x1="33" y1="54.5" x2="42" y2="54.5" stroke="#ffffff" strokeWidth="0.5"/>
            <line x1="62.5" y1="50" x2="62.5" y2="59" stroke="#ffffff" strokeWidth="0.5"/>
            <line x1="58" y1="54.5" x2="67" y2="54.5" stroke="#ffffff" strokeWidth="0.5"/>
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
