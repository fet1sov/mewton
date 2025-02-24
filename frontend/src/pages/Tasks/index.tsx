import monetaPng from '@/assets/moneta.png';
import telegaPng from '@/assets/telega.png';
import { BottomTabs } from '@/components/BottomTabs';
import { Header } from '@/components/Header';
import { completeTask, getTasks } from '@/lib/helpers/tasks';
import { useTelegram } from '@/lib/hooks/useTelegram';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Task {
  id: number;
  task: {
    id: number;
    cannelLink: string;
  };
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { tgw } = useTelegram();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await getTasks();

      setTasks(res);
    })();
  }, []);

  const handleCompleteTask = (taskId: number, channelLink: string) => async () => {
    tgw?.openTelegramLink(`https://t.me/${channelLink}`);

    await completeTask(taskId, channelLink);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl py-10 font-bold text-white">
        <Header />
        <div className="flex-1 mx-4 my-10">
          <h1 className="flex items-center gap-3 mb-10 text-3xl">
            {t('tasks.title')} <img className="w-[30px]" width={30} src={telegaPng} alt="" />
          </h1>
          <div className="flex flex-col gap-3">
            {tasks.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray"
              >
                <span className="text-orange text-semibold text-[14px]">
                  {t('tasks.subscribe')}
                  <span className="text-white">
                    {' '}
                    {t('tasks.to')} {item.task.cannelLink}
                  </span>
                </span>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCompleteTask(item.id, item.task.cannelLink)}
                    className="px-5 py-1 text-xs font-bold rounded-lg bg-orange"
                  >
                    {t('tasks.start')}
                  </button>
                  <span className="flex items-center justify-center gap-2 text-xs">
                    +250 <img className="w-[15px] h-[15px]" width={15} src={monetaPng} alt="" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomTabs />
      </div>
    </div>
  );
}
