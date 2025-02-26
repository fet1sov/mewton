import tonSvg from '@/assets/ton.svg';
import { BottomTabs } from '@/components/BottomTabs';
import { Header } from '@/components/Header';
import { getReferrals } from '@/lib/helpers/referral';
import { useTelegram } from '@/lib/hooks/useTelegram';
import { useUserStore } from '@/lib/store/userStore';
import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Referral {
  referred: Record<string, string>;
}

export function Friends() {
  const [referrals, setReferrals] = useState<Referral[]>([] as Referral[]);
  const telegramId = useUserStore((state) => state.telegramId);
  const syncUserData = useUserStore((state) => state.syncUserData);
  const INVITE_URL = 'https://t.me/mewtonBot';
  const { tgw } = useTelegram();
  const { t } = useTranslation();

  const handleInviteFriend = () => {
    const inviteLink = `${INVITE_URL}?start=${telegramId}`;
    const shareText = `Join the MewTon app!`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink,
    )}&text=${encodeURIComponent(shareText)}`;
    tgw?.openTelegramLink(fullUrl);
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?start=${telegramId}`;
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  useEffect(() => {
    (async () => {
      const res = await getReferrals();
      setReferrals(res.referralsMade);
    })();
    syncUserData();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-full h-screen max-w-xl py-10 font-bold text-white">
        <Header />
        <div className="pb-32 mx-4 mt-10 overflow-auto scrollbar-hide ">
          <h1 className="mb-2 text-2xl text-center">{t('friends.title')}</h1>
          <h3 className="text-[14px] text-center">{t('friends.subtitle')}</h3>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray">
              <div className="flex items-center gap-2">
                <img className="w-[25px] h-[25px]" src={tonSvg} alt="" />
                <span className="text-2xl text-semibold">0.001</span>
              </div>
              <span className="w-[40%] text-sm">{t('friends.inactiveFriends')}</span>
            </div>
            <div className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray">
              <div className="flex items-center gap-2">
                <img className="w-[25px] h-[25px]" src={tonSvg} alt="" />
                <span className="text-2xl text-semibold">0.005+5%</span>
              </div>
              <span className="w-[40%]  text-sm">
                {t('friends.activeFriends')}{' '}
                <span className="text-orange">{t('friends.active')}</span> {t('friends.friends')}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInviteFriend}
                className="flex-1 px-5 py-1 font-sans text-lg font-bold rounded-lg bg-orange"
              >
                {t('friends.invite')}
              </button>
              <button
                onClick={handleCopyLink}
                className="px-5 py-1 font-sans text-lg font-semibold rounded-lg bg-orange"
              >
                <Copy />
              </button>
            </div>
          </div>
          <h3 className="mt-5 text-lg">{t('friends.referrals')}</h3>
          <div className="flex flex-col my-5">
            {referrals.map((referral) => (
              <div key={referral.referred.username} className="flex items-center justify-between">
                <div className="flex items-center gap-5 ">
                  <span className="text-xs">{referral.referred.username}</span>
                </div>
                <span className="flex items-center gap-1 px-4 py-2 text-sm font-bold">
                  <img className="w-[20px] h-[20px]" src={tonSvg} alt="" />
                  +0.001
                </span>
              </div>
            ))}
          </div>
        </div>
        <BottomTabs />
      </div>
    </div>
  );
}
