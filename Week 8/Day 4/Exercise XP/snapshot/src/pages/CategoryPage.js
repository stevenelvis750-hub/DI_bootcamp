import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchImages } from "../api/pexels";
import ImageGallery from "../components/ImageGallery";

const CategoryPage = () => {
  const { category } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages(category).then(setImages);
  }, [category]);

  return (
    <div>
      <h1>{category.toUpperCase()}</h1>
      <ImageGallery images={images} />
    </div>
  );
};

export default CategoryPage;
