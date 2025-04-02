React Native app that displays products from a static JSON file containing data from
the Shopify Storefront API. The app allows users to browse products, view details, and
manage a shopping cart.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Architecture Overview

```
src/
├── context/
│   └── CartContext.tsx      # Global cart state management
├── screens/
│   ├── ProductListScreen.tsx    # Grid view of products
│   ├── ProductDetailsScreen.tsx # Individual product view
│   └── CartScreen.tsx          # Shopping cart
├── navigation/
│   └── index.tsx           # Navigation configuration
├── types/
│   └── index.ts            # TypeScript type definitions
└── data/
    └── products.json  # Product data

```
## Navigation
Bottom tab menu works as following:

```
- Shop Tab
  └── Stack Navigator
      ├── ProductList (initial screen)
      └── ProductDetails (pushed when product selected)
- Cart Tab
```
## State Management with Cart Context

The application uses React Context for managing the shopping cart state globally. This implementation allows any component in the app to access and modify the cart without prop drilling. The CartProvider wraps the main navigation in `App.tsx`, ensuring cart functionality is available throughout the app,


### Cart Context Implementation

The cart state management is centralized in `src/context/CartContext.tsx` and provides:

```typescript
interface CartContextValue {
  items: CartItem[];              // Current items in cart
  addToCart: (variant: ProductVariant) => void;  // Add or increment item
  removeFromCart: (variantId: string) => void;   // Remove item
  getTotalPrice: () => Money;     // Calculate cart total
}
```
