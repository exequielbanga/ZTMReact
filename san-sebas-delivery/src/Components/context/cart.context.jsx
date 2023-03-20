import { createContext, useState } from 'react';

const addCartItem = (cartItems,productToAdd) =>{

    const existingCartItem = cartItems.find((cartItem)=>{
        return cartItem.id == productToAdd.id
    })
    if (existingCartItem){
        return cartItems.map((cartItem)=>{
            if (cartItem.id == existingCartItem.id){
                cartItem.quantity += 1
            }
            return cartItem
        })
    }else{
        return [...cartItems,{...productToAdd, quantity:1}]
    }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems:[],
  addItemToCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]) 
  
  const addItemToCart = (item) => {
    setCartItems(addCartItem(cartItems,item))
  } 
  

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};