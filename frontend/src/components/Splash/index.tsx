import coinSvg from '@/assets/moneta.png';
import tonSvg from '@/assets/ton.svg';
import { useEffect, useState } from 'react';

export const Splash = () => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev > 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex items-center gap-2">
        <img className="w-[47px] h-[47px]" src={tonSvg} alt="" />
        <span className="text-2xl font-bold uppercase text-orange">
          Mew<span className="text-white">ton</span>
        </span>
        <img className="w-[47px] h-[47px]" src={coinSvg} alt="" />
      </div>

      <div className="flex flex-col items-end w-[60%]  mx-auto mt-5 gap-1">
        <div className="w-full h-2 bg-white rounded-lg">
          <div
            className="h-2 transition-all duration-700 ease-in-out rounded-lg bg-orange"
            style={{ width: `${loading}%` }}
            aria-label={`${loading}%`}
          />
        </div>
        <span className="font-bold text-white">{loading}%</span>
      </div>
    </div>
  );
};
