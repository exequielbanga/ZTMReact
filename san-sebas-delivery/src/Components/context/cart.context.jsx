import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id == productToAdd.id
  })
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      if (cartItem.id == existingCartItem.id) {
        cartItem.quantity += 1
      }
      return cartItem
    })
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }]
  }
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id == productToRemove.id
  })

  if (existingCartItem.quantity == 1) {
    return cartItems.filter(cartItem => cartItem.id != productToRemove.id)
  }

  return cartItems.map((cartItem) => {
    if (cartItem.id == existingCartItem.id) {
      cartItem.quantity -= 1
    }
    return cartItem
  })
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  itemsCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [itemsCount, setItemsCount] = useState(0)

  const addItemToCart = (item) => {
    setItemsCount(itemsCount + 1)
    setCartItems(addCartItem(cartItems, item))
  }
  const removeItemFromCart = (item) => {
    setItemsCount(itemsCount - 1)
    setCartItems(removeCartItem(cartItems, item))
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    cartItems, 
    itemsCount 
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};