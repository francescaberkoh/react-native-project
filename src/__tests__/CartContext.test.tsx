import { renderHook } from '@testing-library/react-hooks/native';
import { act } from '@testing-library/react-native';
import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';

const mockVariant = {
  id: 'test-variant-1',
  title: 'Test Variant',
  quantityAvailable: 10,
  availableForSale: true,
  currentlyNotInStock: false,
  price: {
    amount: '29.99',
    currencyCode: 'CAD'
  },
  compareAtPrice: null,
  sku: 'TEST-SKU-1',
  selectedOptions: [],
  image: {
    id: 'test-image-1',
    url: 'https://test.com/image.jpg'
  }
};

const mockVariant2 = {
  ...mockVariant,
  id: 'test-variant-2',
  price: {
    amount: '19.99',
    currencyCode: 'CAD'
  }
};

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('should start with an empty cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalPrice()).toEqual({
      amount: '0.00',
      currencyCode: 'CAD'
    });
  });

  it('should add items to cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockVariant);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('test-variant-1');
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('should increase quantity when adding same item', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockVariant);
      result.current.addToCart(mockVariant);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('should remove items from cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockVariant);
      result.current.removeFromCart(mockVariant.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total price correctly', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockVariant); // $29.99
      result.current.addToCart(mockVariant); // $29.99 (quantity: 2)
      result.current.addToCart(mockVariant2); // $19.99
    });

    const total = result.current.getTotalPrice();
    expect(total.amount).toBe('79.97'); // (29.99 * 2) + 19.99
    expect(total.currencyCode).toBe('CAD');
  });
});
