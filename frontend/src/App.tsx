import { changeLanguage } from 'i18next';
import { useEffect, useState } from 'react';
import { CustomRouter } from './components/CustomRouter';
import { Routing } from './components/Routing';
import { referral } from './lib/helpers/referral';
import { login } from './lib/helpers/user';
import { useTelegram } from './lib/hooks/useTelegram';
import { useUserStore } from './lib/store/userStore';
import { history } from './lib/utils/history';

function App() {
  const { tgw, user } = useTelegram();
  const [isFirst, setIsFirst] = useState(false);
  const startParam = tgw?.initDataUnsafe.start_param;
  const syncUserData = useUserStore((state) => state.syncUserData);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const isFirst = await login({
        telegramId: user?.id,
        username: String(user?.username),
      });
      await syncUserData();
      if (startParam) {
        try {
          await referral(+startParam);
        } catch (error) {
          console.error('Error saving referral:', error);
        }
      }
      setIsLoading(false);
      setIsFirst(isFirst);
    })();
  }, [user.id, startParam]);

  useEffect(() => {
    if (user.language_code) {
      changeLanguage(user.language_code || 'ru');
    }
  }, [user.language_code]);

  if (isFirst) {
    history.push('/welcome');
  }

  return (
    <CustomRouter history={history}>
      <Routing />
    </CustomRouter>
  );
}

export default App;
