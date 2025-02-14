import clsx from 'clsx';

interface WelcomeBottomProps {
  activeTab: number;
}
export const WelcomeBottom = ({ activeTab }: WelcomeBottomProps) => {
  return (
    <div className="px-4 mt-5 flex flex-col gap-4 mb-3">
      <div className="flex justify-center gap-5">
        <div className={clsx(activeTab === 1 ? 'bg-orange' : 'bg-gray', 'h-[3px] w-[70px] ')} />
        <div className={clsx(activeTab === 2 ? 'bg-orange' : 'bg-gray', 'h-[3px] w-[70px] ')} />
        <div className={clsx(activeTab === 3 ? 'bg-orange' : 'bg-gray', 'h-[3px] w-[70px] ')} />
      </div>
      <button className="bg-orange w-full h-12 rounded-xl font-medium text-lg font-sans">
        Next
      </button>
    </div>
  );
};
