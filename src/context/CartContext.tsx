import React, { createContext, useCallback, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { CartItem, Money, ProductVariant } from '../types';
interface CartContextType {
  items: CartItem[];
  addToCart: (variant: ProductVariant) => void;
  removeFromCart: (variantId: string) => void;
  getTotalPrice: () => Money;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((variant: ProductVariant) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === variant.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...variant, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((variantId: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => {
            setItems(currentItems =>
              currentItems.filter(item => item.id !== variantId)
            );
          },
          style: "destructive"
        }
      ]
    );
  }, []);

  const getTotalPrice = useCallback(() => {
    if (items.length === 0) {
      return { amount: '0.00', currencyCode: 'CAD' };
    }

    const total = items.reduce((total, item) => {
      return total + (parseFloat(item.price.amount) * item.quantity);
    }, 0);

    return {
      amount: total.toFixed(2),
      currencyCode: items[0].price.currencyCode,
    };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
