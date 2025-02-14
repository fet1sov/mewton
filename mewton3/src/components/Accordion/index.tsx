import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}
export const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleAccordion = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="flex flex-col w-full gap-4 px-4 py-4 rounded-lg bg-gray">
      <div className="flex items-center justify-between w-full ">
        <span className="w-2/3 text-base text-bold">{title}</span>
        <div className="flex flex-col gap-2">
          <button
            className="px-5 py-1 text-xs font-bold rounded-lg bg-orange"
            onClick={toggleAccordion}
          >
            {isOpen ? t('info.hide') : t('info.read')}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray border-t-2 border-slate-300 pt-4 text-[13px]">{children}</div>
      )}
    </div>
  );
};
