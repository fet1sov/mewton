import { AdminBottomTabs } from '@/components/AdminBottomTabs';
import { Input } from '@/components/ui/input';
import BoostInfo, { useBoostStore } from '@/lib/store/boostStore';
import { useUserStore } from '@/lib/store/userStore';
import { history } from '@/lib/utils/history';

export const AdminAddBoosts = () => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const createBoost = useBoostStore((state) => state.createBoost);

  if (!isAdmin) {
    history.push('/');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    createBoost({
      name: String(formData.get('name')),
      buyPrice: Number(formData.get('buyPrice')),
      boostPrice: Number(formData.get('boostPrice')),
      imageUrl: String(formData.get('imageUrl'))
    } as BoostInfo);
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl py-10 font-bold text-white">
        <div className="flex-1 mx-4 ">
          <h1 className="flex items-center gap-3 mb-10 text-3xl">Добавить Буст</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <form onSubmit={handleSubmit}>

                    <Input className="my-2" name='name' placeholder="Название буста"/>
                    <Input className="my-2" name='buyPrice' placeholder="Цена покупки"/>
                    <Input className="my-2" name='boostPrice' placeholder="Цена буста"/>
                    <Input className="my-2" name='imageUrl' placeholder="Путь до картинки"/>
                    

                    <button className="w-full px-4 py-2 text-xs font-bold bg-orange rounded-xl">
                        Создать буст
                    </button>
                </form>
            </div>
          </div>
        </div>
      </div>
      <AdminBottomTabs />
    </div>
  );
};