// src/services/tiktokApi.ts
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '5ef16d0ff3msh932509b4a07f17p17a2f7jsn2ef2adf909ac';
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'tiktok-shop-analysis.p.rapidapi.com';
const TRENDSAPI_KEY = process.env.NEXT_PUBLIC_TRENDSAPI_KEY || 'tapi_live_d53bg1bcopabc4x04imcbo5ieiic17y6';

export async function getTrendingHashtags() {
  try {
    const response = await fetch('https://api.trendsapi.ai/api/v1/get_top_trends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TRENDSAPI_KEY
      },
      body: JSON.stringify({
        platform: 'tiktok',
        country: 'br',
        limit: 10
      })
    });
    if (!response.ok) throw new Error('Erro ao buscar tendências');
    const data = await response.json();
    return data.trends || [];
  } catch (error) {
    return [
      { hashtag: 'fyp', volume: 1250000, growth: '+15%' },
      { hashtag: 'foryou', volume: 980000, growth: '+12%' },
      { hashtag: 'tiktokbrasil', volume: 750000, growth: '+8%' },
      { hashtag: 'moda', volume: 520000, growth: '+25%' },
    ];
  }
}

export async function getTopProducts() {
  try {
    const response = await fetch('https://tiktok-shop-analysis.p.rapidapi.com/product/search', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [
      { id: 1, name: 'Kit Maquiagem', price: 149.90, sales: 2340, rating: 4.8 },
      { id: 2, name: 'Fone Bluetooth', price: 89.90, sales: 1870, rating: 4.6 },
      { id: 3, name: 'Camiseta Oversized', price: 59.90, sales: 3200, rating: 4.7 },
    ];
  }
}

export async function getLiveStats(username: string) {
  return {
    username,
    viewers: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 10000) + 500,
    gifts: Math.floor(Math.random() * 200) + 10,
    products: [
      { id: 1, name: 'Kit Maquiagem', price: 149.90, sales: 2340, rating: 4.8 },
      { id: 2, name: 'Fone Bluetooth', price: 89.90, sales: 1870, rating: 4.6 },
    ]
  };
}