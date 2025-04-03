import { useState, useEffect } from "react";

const useUserAvatar = (userId) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // In a real app, you would fetch from your API/database
        // This is a placeholder implementation
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
          // Mock data - replace with actual API call
          const savedAvatar = localStorage.getItem(`user_${userId}_avatar`);
          if (savedAvatar) {
            setAvatar(JSON.parse(savedAvatar));
          } else {
            // Default avatar if none is set
            setAvatar({
              id: 1,
              src: "/assets/images/avatars/default/avatar1.png",
              alt: "Default Avatar",
            });
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message || "Failed to load avatar");
        setLoading(false);
      }
    };

    fetchUserAvatar();
  }, [userId]);

  const updateAvatar = (newAvatar) => {
    if (!userId) return;

    // Update local state
    setAvatar(newAvatar);

    // Save to storage (in a real app, you'd save to your backend)
    localStorage.setItem(`user_${userId}_avatar`, JSON.stringify(newAvatar));
  };

  return {
    avatar,
    loading,
    error,
    updateAvatar,
  };
};

export default useUserAvatar;
