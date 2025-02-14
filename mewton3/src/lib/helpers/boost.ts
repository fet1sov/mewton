import rest from '../services/rest';

export const getBoosts = async () => {
  const res = await rest.get('/boosts/user');

  return res.data.boosts;
};

export const buyBoost = async (boostId: number) => {
  const res = await rest.post(`/boosts/buy/${boostId}`);

  return res.data.boosts;
};

export const getAllBoosts = async () => {
  const res = await rest.get('/boosts');

  return res.data;
};

export const updateBoost = async (boostId: number, isAvailable: boolean) => {
  const res = await rest.patch(`/boosts/${boostId}`, { isAvailable });

  return res.data;
};
