'use client';

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-6 bg-black text-white ">
      
      {/* Logo */}
      <div className="text-3xl font-bold flex gap-2">
        <p className="text-blue-500">Y<span className="text-white">ASH</span></p>
        <p className="text-blue-500">G<span className="text-white">UPTA</span></p>
      </div>

      {/* Open To Work Badge */}
      <div className="relative">
        <div className="flex items-center gap-3 
                        px-5 py-2 
                        rounded-full 
                        border-2 border-dashed border-green-500
                        bg-green-500/10
                        backdrop-blur-md
                        shadow-[0_0_25px_rgba(34,197,94,0.3)]">

          {/* Green Dot */}
          <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.9)] animate-pulse"></span>

          {/* Text */}
          <p className="text-green-300 text-lg font-medium tracking-wide">
            Open to work
          </p>
        </div>
      </div>

    </div>
  );
};