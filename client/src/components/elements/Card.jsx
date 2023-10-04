import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white text-center rounded-lg p-4 shadow-md overflow-hidden hover:shadow-lg ease-in-out transform group-hover:scale-110 transition-all duration-300 min-h-[calc(100px + 3vh)] sm:min-h-[calc(150px + 3vh)] md:min-h-[calc(200px + 3vh)] lg:min-h-[calc(250px + 3vh)]">
      {children}
    </div>
  );
};

const CardImage = ({ src, alt = "" }) => {
  return <img src={src} alt={alt} />;
};

const CardHeader = ({ children }) => {
  return <h3>{children}</h3>;
};

const CardDescription = ({ children }) => {
  return <p>{children}</p>;
};

Card.Image = CardImage;
Card.Header = CardHeader;
Card.Description = CardDescription;

export default Card;
