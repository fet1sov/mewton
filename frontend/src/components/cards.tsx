import cat1 from '@/assets/cat1.png';
import cat10 from '@/assets/cat10.png';
import cat4 from '@/assets/cat4.png';
import cat8 from '@/assets/cat8.png';
import convert from '@/assets/convert.png';
import moneta from '@/assets/moneta.png';
import tonSvg from '@/assets/ton.svg';

export const Cards = () => {
  return (
    <div className="grid grid-cols-2 gap-3 w-[95%] ">
      <div className="flex flex-col items-center justify-between gap-2 p-4 bg-cardBg rounded-2xl">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] flex gap-2 items">
            <img className="w-[12px]" src={convert} alt="" />
            Loki
          </span>
          <span className="text-[10px] flex gap-1 items-center">
            <img className="w-[12px]" src={moneta} alt="" />
            2000
          </span>
        </div>
        <img className="w-[69px]" src={cat8} alt="" />
        <button className="flex flex-col items-center w-full p-1 text-xs font-bold rounded-lg bg-orange">
          Buy{' '}
          <span className="text-[8px] flex gap-1 items-center">
            +0.01 <img className="w-[10px]" src={tonSvg} alt="" />
          </span>
        </button>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 p-4 bg-cardBg rounded-2xl">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] flex gap-2 items">
            <img className="w-[12px]" src={convert} alt="" />
            Leo
          </span>
          <span className="text-[10px] flex gap-1 items-center">
            <img className="w-[12px]" src={tonSvg} alt="" />
            0.1
          </span>
        </div>
        <img className="w-[69px]" src={cat10} alt="" />
        <button className="flex flex-col items-center w-full p-1 text-xs font-bold rounded-lg bg-orange">
          Buy{' '}
          <span className="text-[8px] flex gap-1 items-center">
            +0.15 <img className="w-[10px]" src={tonSvg} alt="" />
          </span>
        </button>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 p-4 bg-cardBg rounded-2xl">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] flex gap-2 items">
            <img className="w-[12px]" src={convert} alt="" />
            Luna
          </span>
          <span className="text-[10px] flex gap-1 items-center">
            <img className="w-[12px]" src={tonSvg} alt="" />
            0.2
          </span>
        </div>
        <img className="w-[69px]" src={cat4} alt="" />
        <button className="flex flex-col items-center w-full p-1 text-xs font-bold rounded-lg bg-orange">
          Buy{' '}
          <span className="text-[8px] flex gap-1 items-center">
            +0.30 <img className="w-[10px]" src={tonSvg} alt="" />
          </span>
        </button>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 p-4 bg-cardBg rounded-2xl">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] flex gap-2 items">
            <img className="w-[12px]" src={convert} alt="" />
            Roxy
          </span>
          <span className="text-[10px] flex gap-1 items-center">
            <img className="w-[12px]" src={tonSvg} alt="" />
            0.6
          </span>
        </div>
        <img className="w-[69px]" src={cat1} alt="" />
        <button className="flex flex-col items-center w-full p-1 text-xs font-bold rounded-lg bg-orange">
          Buy{' '}
          <span className="text-[8px] flex gap-1 items-center">
            +1.00 <img className="w-[10px]" src={tonSvg} alt="" />
          </span>
        </button>
      </div>
    </div>
  );
};
