import rest from '../services/rest';
import BoostInfo from '../store/boostStore';

export const getBoosts = async () => {
  const res = await rest.get('/boosts/user');

  return res.data.boosts;
};

export const buyBoost = async (boostId: number) => {
  try {
    const res = await rest.post(`/boosts/buy/${boostId}`);
    return res;
  } catch (error) {
    return {
      status: 500,
      data: {
        boosts: []
      }
    };
  }
};

export const getAllBoosts = async () => {
  const res = await rest.get('/boosts');

  return res.data;
};

export const updateBoost = async (boostId: number, isAvailable: boolean) => {
  const res = await rest.patch(`/boosts/${boostId}`, { isAvailable });

  return res.data;
};

export const createBoost = async (boostInfo: BoostInfo) => {
  const res = await rest.post(`/boosts/create`, { ...boostInfo });
  return res.data;
};
