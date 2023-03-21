import { createContext, useEffect, useState } from 'react';

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

const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter(cartItem => cartItem.id != productToRemove.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  itemsCount: 0,
  cartTotal:0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [itemsCount, setItemsCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)


  useEffect(()=>{
    const newCartTotal = cartItems.reduce(
      (total, item) => total + item.quantity*item.price,0)
      setCartTotal(newCartTotal)
  },[cartItems])

  const addItemToCart = (item) => {
    setItemsCount(itemsCount + 1)
    setCartItems(addCartItem(cartItems, item))
  }
  const removeItemFromCart = (item) => {
    setItemsCount(itemsCount - 1)
    setCartItems(removeCartItem(cartItems, item))
  }
  const clearItemFromCart = (product) =>{
    setItemsCount(itemsCount - product.quantity)
    setCartItems(clearCartItem(cartItems, product))
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart,
    cartItems, 
    itemsCount,
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};