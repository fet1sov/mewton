import rest from '../services/rest';

export const referral = async (referrerId: number) => {
  const res = await rest.post('/referrals', {
    referrerId,
  });
  return res.data;
};

export const getReferrals = async () => {
  const res = await rest.get('/referrals');
  return res.data;
};
