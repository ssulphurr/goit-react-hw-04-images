import axios from 'axios';

const fetchImages = async (searchInput, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchInput}&page=${page}&key=34712470-649d4f955d7295175d07d13ae&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};

const api = {
  fetchImages,
};

export default api;
