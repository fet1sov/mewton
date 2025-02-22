import { AdminBottomTabs } from '@/components/AdminBottomTabs';
import { Switch } from '@/components/ui/switch';
import { getAllBoosts } from '@/lib/helpers/boost';
import { useBoostStore } from '@/lib/store/boostStore';
import { useUserStore } from '@/lib/store/userStore';
import { history } from '@/lib/utils/history';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AdminBoosts = () => {
  const boosts = useBoostStore((state) => state.boosts);
  const setBoosts = useBoostStore((state) => state.setBoosts);
  const updateVisibility = useBoostStore((state) => state.updateVisibility);
  const isAdmin = useUserStore((state) => state.isAdmin);

  useEffect(() => {
    (async () => {
      const res = await getAllBoosts();

      setBoosts(res);
    })();
  }, []);

  if (!isAdmin) {
    history.push('/');
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl py-10 font-bold text-white">
        <div className="flex-1 mx-4 ">
          <h1 className="flex items-center gap-3 mb-10 text-3xl">Бусты</h1>
          <div className="flex flex-col gap-3">
            <Link className="w-full text-center px-4 py-2 text-xs font-bold bg-orange rounded-xl" to={'/admin/boosts/add'}>
              + Добавить буст
            </Link>
            <div className="flex flex-col gap-3">
              {boosts?.map((item) => {
                const handleCheckedChange = (value: boolean) => {
                  updateVisibility(item.id, value);
                };

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-grayBg"
                  >
                    <span className="text-lg">{item.name}</span>
                    <Switch checked={item.isAvailable} onCheckedChange={handleCheckedChange} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <AdminBottomTabs />
    </div>
  );
};
