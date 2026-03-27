import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prevList => {
      const exists = prevList.some(item => item.id === product.id);
      if (exists) {
        toast.success(`Removed ${product.name} from wishlist`);
        return prevList.filter(item => item.id !== product.id);
      }
      toast.success(`Added ${product.name} to wishlist`);
      return [...prevList, product];
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
