import { useState, useContext } from "react"
import { UserContext } from "../context/user.context"

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"

import './sign-up-form.styles.scss'

import FormInput from "../form-input/form-input.component"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const {setCurrentUser} = useContext(UserContext) 

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const cleanForm = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password != confirmPassword) {
            alert("Passwords don't match")
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user)

            const userDocReference = await createUserDocumentFromAuth(user,{ displayName })
            cleanForm()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }


    return (
        <div className="sign-up-container">
            <h2>Don't have an acount?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required />
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm