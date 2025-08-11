const apiKey = '6ec0ba8fa041ffdfd513a6b00a854a64';
const apiUrl = 'https://api.themoviedb.org/3';

export const fetchMovieDetail = async (movieId) => {
  const url = `${apiUrl}/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};