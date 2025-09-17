import { useEffect, useRef } from 'react';

import LoginForm from '../components/LoginForm';

export default function Landing() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      // Only handle vertical scroll (deltaY), ignore horizontal scroll (deltaX)
      if (event.deltaY !== 0) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  };

  return (
    <main 
      ref={containerRef}
      className="min-h-screen flex flex-row overflow-x-hidden overflow-y-hidden"
    >
      <section 
        id="welcome"
        className="p-15 flex-shrink-0 w-[100vw] h-[100vh] bg-[#f6f5f1]"
      >
        <div className="w-[60vw] flex flex-col">
          <div className="mb-25 w-[70px]">
            <span>Luma</span>
          </div>

          <h1 className="mb-5 text-[80px] leading-tight font-bold">
            Streamlined Finances
          </h1>

          <p className="mb-10 text-[23px] opacity-60">
            Your one-stop shop for all things financial.
          </p>

          <button 
            className="px-[25px] py-[12px] w-fit bg-[#3069ff] rounded-3xl shadow-md hover:cursor-pointer hover:bg-[#2557d6]"
            onClick={() => scrollToSection("login")}
          >
            <span className="text-white">Start Saving</span>
          </button>
        </div>
      </section>

      <section
        id="login"
        className="p-15 flex-shrink-0 w-[100vw] h-[100vh] bg-[#f6f5f1]"
      >
        <h1 className="mb-[10px] text-[80px] font-bold">Sign in</h1>
        <div className="mb-[50px] text-[17px] opacity-60">One step closer to financial freedom</div>
        <LoginForm />
      </section>
    </main>
  );
}
