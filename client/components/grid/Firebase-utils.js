import axios from 'axios';

export async function getHighestScores() {
  const response = await axios.get('/api/scores');
  return response.data.sort((a, b) => b.score - a.score).slice(0, 10);
}

export async function addScore(data) {
  await axios.post('/api/scores', data);
}
