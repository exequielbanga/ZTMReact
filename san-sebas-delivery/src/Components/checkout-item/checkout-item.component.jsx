import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../context/cart.context'

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

    const clearItemHandler = () => {
        clearItemFromCart(cartItem)
    }
    const increaseItemQuantityHandler = () => {
        addItemToCart(cartItem)
    }

    const decreaseItemQuantityHandler = () => {
        removeItemFromCart(cartItem)
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseItemQuantityHandler}>&#10094;</div>
                <span className='value'>
                    {quantity}
                </span>
                <div className='arrow' onClick={increaseItemQuantityHandler}>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            <div className='removing-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}
export default CheckoutItem