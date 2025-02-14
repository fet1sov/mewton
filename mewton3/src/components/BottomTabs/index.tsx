import { useUserStore } from '@/lib/store/userStore';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BoostSvg } from '../icons/Boost';
import Friends from '../icons/Friends';
import { InfoSvg } from '../icons/InfoSvg';
import { MainSvg } from '../icons/Main';
import { TaskSvg } from '../icons/Task';
import { WalletSvg } from '../icons/Wallet';

export const BottomTabs = () => {
  const { t } = useTranslation();
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className="fixed bottom-5 py-3 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
      <Link to="/" className="flex flex-col items-center w-1/5 text-center text-light">
        <MainSvg />
        <p className="mt-1 text-[9px]">{t('navigation.home')}</p>
      </Link>
      <Link to="/boost" className="flex flex-col items-center w-1/5 text-center text-light">
        <BoostSvg />
        <p className="mt-1 text-[9px]">{t('navigation.boost')}</p>
      </Link>
      <Link to="/tasks" className="flex flex-col items-center w-1/5 text-center text-light">
        <TaskSvg />
        <p className="mt-1 text-[9px]">{t('navigation.tasks')}</p>
      </Link>
      <Link to="/friends" className="flex flex-col items-center w-1/5 text-center text-light">
        <Friends />
        <p className="mt-1 text-[9px]">{t('navigation.friends')}</p>
      </Link>
      <Link to="/info" className="flex flex-col items-center w-1/5 text-center text-light">
        <InfoSvg />
        <p className="mt-1 text-[9px]">{t('navigation.info')}</p>
      </Link>
      <Link to="/wallet" className="flex flex-col items-center w-1/5 text-center text-light">
        <WalletSvg />
        <p className="mt-1 text-[9px]">{t('navigation.wallet')}</p>
      </Link>
      {isAdmin && (
        <Link
          to="/admin/boosts"
          className="flex flex-col items-center w-1/5 text-center text-light"
        >
          <User />
          <p className="mt-1 text-[9px]">Admin</p>
        </Link>
      )}
    </div>
  );
};
