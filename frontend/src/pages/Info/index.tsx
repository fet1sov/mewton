import monetaSvg from '@/assets/moneta.png';
import tonSvg from '@/assets/ton.svg';
import { Accordion } from '@/components/Accordion';
import { BottomTabs } from '@/components/BottomTabs';
import { Header } from '@/components/Header';
import { useTranslation } from 'react-i18next';

export function Info() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-full h-screen max-w-xl py-10 font-bold text-white">
        <Header />
        <div className="flex-1 pb-32 mx-4 mt-10 overflow-auto scrollbar-hide">
          <h1 className="flex items-center gap-3 mb-10 text-3xl">{t('info.title')}</h1>
          <div className="flex flex-col gap-3">
            <Accordion title={t('info.howToPlay')}>
              <div>
                {t('info.info1.desc1')}
                <img className="w-[15px] h-[15px] mx-1 inline-block" src={monetaSvg} alt="" />{' '}
                {t('info.info1.desc2')}
                <img className="w-[15px] h-[15px] mx-1 inline-block" src={tonSvg} alt="" />{' '}
                {t('info.info1.desc3')}
              </div>
            </Accordion>
            <Accordion title={t('info.whatAreBoosts')}>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-bold text-orange">{t('info.info2.desc1')}</span> -{' '}
                  {t('info.info2.desc2')}
                </div>
                {t('info.info2.desc3')}
                <div>
                  <span className="font-bold text-orange">{t('info.info2.desc4')}</span>
                  {t('info.info2.desc5')}
                </div>
                <span>{t('info.info2.desc6')}</span>
              </div>
            </Accordion>
            <Accordion title={t('info.bonuses')}>
              <div className="flex flex-col gap-1">
                <span>{t('info.info3.desc1')}</span>
                <div>
                  <span className="font-bold text-orange">{t('info.info3.desc2')}</span>{' '}
                  {t('info.info3.desc3')}
                </div>
                <div>
                  <span className="font-bold text-orange">{t('info.info3.desc4')}</span>
                  {t('info.info3.desc5')}
                </div>
                <span className="mt-5">{t('info.info3.desc6')}</span>
              </div>
            </Accordion>
            <Accordion title={t('info.withdrawals')}>
              <div className="flex flex-col gap-4">
                <span>{t('info.info4.desc1')}</span>
                <span>{t('info.info4.desc2')}</span>
              </div>
            </Accordion>
            <Accordion title={t('info.contacts')}>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-bold text-orange">{t('info.info5.desc1')}</span>{' '}
                  {t('info.info5.desc2')} -
                </div>
                <div>
                  <span className="font-bold text-orange">{t('info.info5.desc3')}</span>{' '}
                  {t('info.info5.desc4')} -
                </div>
              </div>
            </Accordion>
          </div>
        </div>
        <BottomTabs />
      </div>
    </div>
  );
}
