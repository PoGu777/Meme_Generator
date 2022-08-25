import React from "react";

export const Meme = ({ template, onClick }) => {
  return (
    <img className="meme"
      style={{ width: 300 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
  );
};