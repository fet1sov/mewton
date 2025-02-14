import { updateBoost } from './../helpers/boost';
import { create } from 'zustand';

interface Boost {
  id: number;
  name: string;
  isAvailable: boolean;
}
interface BoostInterface {
  boosts: Boost[];

  setBoosts: (tasks: Boost[]) => void;
  updateVisibility: (id: number, isAvailable: boolean) => void;
}

export const useBoostStore = create<BoostInterface>((set) => ({
  boosts: [],
  setBoosts: (boosts) => set({ boosts }),
  updateVisibility: async (id, isAvailable) =>{
    const updateBoosts = await updateBoost(id, isAvailable);
    set({ boosts: updateBoosts });
  }  
}));
