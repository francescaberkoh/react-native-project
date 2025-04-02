import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { RootStackParamList } from '../types';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { addToCart } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const product = productsData.find((p) => p.id === route.params.productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex];

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: selectedVariant.image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>
          {selectedVariant.price.currencyCode} {selectedVariant.price.amount}
        </Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.variantsContainer}>
          <Text style={styles.variantsTitle}>Available Options:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {product.variants.map((variant, index) => (
              <TouchableOpacity
                key={variant.id}
                style={[
                  styles.variantButton,
                  index === selectedVariantIndex && styles.selectedVariant,
                ]}
                onPress={() => setSelectedVariantIndex(index)}
              >
                <Text
                  style={[
                    styles.variantText,
                    index === selectedVariantIndex && styles.selectedVariantText,
                  ]}
                >
                  {variant.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !selectedVariant.availableForSale && styles.disabledButton,
          ]}
          onPress={() => selectedVariant.availableForSale && addToCart(selectedVariant)}
          disabled={!selectedVariant.availableForSale}
        >
          <Text style={styles.addToCartText}>
            {selectedVariant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 24,
  },
  variantsContainer: {
    marginBottom: 24,
  },
  variantsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  variantButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  selectedVariant: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  variantText: {
    fontSize: 14,
    color: '#000',
  },
  selectedVariantText: {
    color: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
