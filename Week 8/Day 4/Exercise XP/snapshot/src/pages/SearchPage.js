import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchImages } from "../api/pexels";
import ImageGallery from "../components/ImageGallery";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const query = useQuery().get("query");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (query) {
      fetchImages(query).then(setImages);
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ImageGallery images={images} />
    </div>
  );
};

export default SearchPage;
