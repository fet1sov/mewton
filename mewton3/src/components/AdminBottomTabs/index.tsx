import { BookCheck, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainSvg } from '../icons/Main';

export const AdminBottomTabs = () => {
  return (
    <div className="fixed bottom-5 py-3 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
      <Link to="/" className="flex flex-col items-center w-1/5 text-center text-light">
        <MainSvg />
        <p className="mt-1 text-[9px]">Главная</p>
      </Link>
      <Link to="/admin/boosts" className="flex flex-col items-center w-1/5 text-center text-light">
        <Rocket />
        <p className="mt-1 text-[9px]">Бусты</p>
      </Link>
      <Link to="/admin/tasks" className="flex flex-col items-center w-1/5 text-center text-light">
        <BookCheck />
        <p className="mt-1 text-[9px]">Задания</p>
      </Link>
    </div>
  );
};
