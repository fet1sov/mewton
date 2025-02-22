import { AdminBottomTabs } from '@/components/AdminBottomTabs';
import { InputForm } from '@/components/InputForm';
import { getAllTasks } from '@/lib/helpers/tasks';
import { useTaskStore } from '@/lib/store/taskStore';
import { useUserStore } from '@/lib/store/userStore';
import { history } from '@/lib/utils/history';
import { useEffect } from 'react';

export const AdminTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const isAdmin = useUserStore((state) => state.isAdmin);

  useEffect(() => {
    (async () => {
      const res = await getAllTasks();

      setTasks(res);
    })();
  }, []);

  if (!isAdmin) {
    history.push('/');
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl py-10 font-bold text-white">
        <div className="flex-1 mx-4 ">
          <h1 className="flex items-center gap-3 mb-10 text-3xl">Задания</h1>
          <div className="flex flex-col gap-3">
            <InputForm />
            <div className="flex flex-col gap-3">
              {tasks?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-grayBg"
                >
                  <span className="text-lg">{item.cannelLink}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AdminBottomTabs />
    </div>
  );
};
