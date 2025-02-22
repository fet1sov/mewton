import { updateBoost, createBoost } from './../helpers/boost';
import { create } from 'zustand';

interface Boost {
  id: number;
  name: string;
  isAvailable: boolean;
}

export default interface BoostInfo {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  buyPrice: number;
  boostPrice: number;
  isAvailable: boolean;
}

interface BoostInterface {
  boosts: Boost[];

  setBoosts: (tasks: Boost[]) => void;
  updateVisibility: (id: number, isAvailable: boolean) => void;
  createBoost: (boostInfo: BoostInfo) => void;
}

export const useBoostStore = create<BoostInterface>((set) => ({
  boosts: [],
  setBoosts: (boosts) => set({ boosts }),
  updateVisibility: async (id, isAvailable) =>{
    const updateBoosts = await updateBoost(id, isAvailable);
    set({ boosts: updateBoosts });
  },
  createBoost: async (boostInfo) => {
    await createBoost(boostInfo);
  }
}));
