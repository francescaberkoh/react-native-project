export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  quantityAvailable: number;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  price: Money;
  compareAtPrice: Money | null;
  sku: string;
  selectedOptions: SelectedOption[];
  image: ProductImage;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  handle: string;
  productType: string;
  tags: string[];
  vendor: string;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  compareAtPriceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  requiresSellingPlan: boolean;
  onlineStoreUrl: string;
}

export interface CartItem extends ProductVariant {
  quantity: number;
}

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: string };
  Collection: undefined;
  Cart: undefined;
};

export type RootTabParamList = {
  Shop: undefined;
  Cart: undefined;
};
