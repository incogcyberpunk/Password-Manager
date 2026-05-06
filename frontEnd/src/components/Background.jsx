import { useTheme } from '../context/theme.context.jsx';

export default function Background({ children }) {
    const { theme } = useTheme();
    
    return (
      <>
        <div className="relative w-full h-full">
          <div className={`absolute inset-0 -z-10 h-full w-full ${theme === 'light' ? 'bg-[radial-gradient(circle_at_top,#f7efe1,transparent_65%),radial-gradient(circle_at_20%_20%,#e1f0ec,transparent_55%),linear-gradient(180deg,#f6f1e8,#efe7dc)]' : 'bg-[radial-gradient(circle_at_top,#0f172a,transparent_55%),radial-gradient(circle_at_20%_20%,#0b3a37,transparent_55%),linear-gradient(180deg,#0b1220,#0f172a)]'} overflow-hidden`}>
            <div className={`absolute inset-0 ${theme === 'light' ? 'bg-[linear-gradient(to_right,rgba(20,80,90,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,80,90,0.08)_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)]'} bg-[size:6rem_5rem] opacity-60`}></div>
            <div className={`absolute -top-24 -right-16 h-64 w-64 rounded-full blur-3xl ${theme === 'light' ? 'bg-amber-200/60' : 'bg-amber-500/20'}`}></div>
            <div className={`absolute -bottom-20 -left-20 h-72 w-72 rounded-full blur-3xl ${theme === 'light' ? 'bg-teal-200/60' : 'bg-teal-500/20'}`}></div>
          </div>
          {children}
        </div>
      </>
    );
  }
  
