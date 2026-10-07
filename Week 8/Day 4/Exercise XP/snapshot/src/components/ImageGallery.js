import React from "react";

const ImageGallery = ({ images }) => (
  <div className="gallery">
    {images.map((img) => (
      <div key={img.id} className="image-container">
        <img src={img.src.medium} alt={img.photographer} />
        <p>{img.photographer}</p>
      </div>
    ))}
  </div>
);

export default ImageGallery;
