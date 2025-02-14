import tonSvg from '@/assets/ton.svg';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
interface IProps {
  title: string;
}
export const TopUp = ({ title }: IProps) => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-full px-4 py-2 text-xs font-bold bg-primary rounded-xl">
          {title}
        </button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-5 text-white">
          <span className="flex items-center gap-2">
            <img className="w-[20px]" src={tonSvg} alt="" />
            UJF...33_
            <ChevronDown />
          </span>
          <span className="text-2xl font-bold">{t('modals.topUp')}</span>
          <div className="w-full h-[1px] bg-slate-300" />
          <input
            type="number"
            placeholder={t('modals.placeholder')}
            className="w-full px-3 py-1 font-normal rounded-md bg-gray focus:outline-none"
          />
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold">{t('modals.fee')}</span>
            <div className="flex w-1/2 gap-2">
              <span className="text-xs font-bold">{t('modals.description')}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold">0%</span>
            <div className="flex w-1/2 gap-2">
              <span className="flex items-center gap-1 text-xs font-bold">
                <img className="w-[10px] mb-[2px]" src={tonSvg} alt="" />0
              </span>
            </div>
          </div>
          <button className="w-full p-1 text-base font-semibold rounded-lg bg-orange">
            {t('modals.topUp')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
