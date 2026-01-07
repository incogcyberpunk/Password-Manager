import { useTheme } from '../context/theme.context.jsx';

export default function Background({ children }) {
    const { theme } = useTheme();
    
    return (
      <>
        <div className={`absolute inset-0 -z-10 h-full w-full ${theme === 'light' ? 'bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]' : 'bg-slate-900 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]'} bg-[size:6rem_4rem]`}>
          <div className={`absolute bottom-0 left-0 right-0 top-0 ${theme === 'light' ? 'bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]' : 'bg-[radial-gradient(circle_800px_at_100%_200px,#4c1d95,transparent)]'}`}>
            {children}
          </div>
        </div>
      </>
    );
  }
  