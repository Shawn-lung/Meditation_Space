import React, { useState, useEffect } from "react";
import "./AvatarSelector.css";

const AvatarSelector = ({ onSelect, currentAvatar }) => {
  const [category, setCategory] = useState("default");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || null);

  const categories = ["default", "nature", "spiritual", "abstract"];

  useEffect(() => {
    // In a real app, you would fetch avatars based on the selected category
    // This is a placeholder for demonstration
    fetchAvatarsForCategory(category);
  }, [category]);

  const fetchAvatarsForCategory = (categoryName) => {
    // Placeholder - in a real app you would fetch from your server or file system
    // Example implementation
    const mockAvatars = [
      {
        id: 1,
        src: `/assets/images/avatars/${categoryName}/avatar1.png`,
        alt: "Avatar 1",
      },
      {
        id: 2,
        src: `/assets/images/avatars/${categoryName}/avatar2.png`,
        alt: "Avatar 2",
      },
      {
        id: 3,
        src: `/assets/images/avatars/${categoryName}/avatar3.png`,
        alt: "Avatar 3",
      },
    ];
    setAvatars(mockAvatars);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    if (onSelect) {
      onSelect(avatar);
    }
  };

  return (
    <div className="avatar-selector">
      <h2>Select Your Avatar</h2>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="avatars-grid">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className={`avatar-item ${
              selectedAvatar?.id === avatar.id ? "selected" : ""
            }`}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img src={avatar.src} alt={avatar.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
