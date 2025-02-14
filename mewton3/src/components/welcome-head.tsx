import { ThreeDots } from './icons/treedots';

export const WelcomeHead = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-welcomeHeadBg h-[55px] mt-10">
      <h2 className=" font-medium">Закрыть</h2>
      <div className="flex flex-col items-center mr-9">
        <h1 className="text-xl">MewTon</h1>
        <span className="text-xs text-textGray">мини-приложение</span>
      </div>
      <ThreeDots />
    </div>
  );
};
