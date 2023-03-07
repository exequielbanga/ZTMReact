import './button.styles.scss'

const BUTTONS_TYPE_CLASSES = {
    google: 'google-sign-in',    inverted: 'inverted',
    default: 'default'
}

const Button = ({children, buttonType}) =>{
    return (
        <button className={`button-container ${BUTTONS_TYPE_CLASSES[buttonType]}`}>
            {children}
        </button>
    )
}

export default Button