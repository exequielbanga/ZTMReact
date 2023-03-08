import { useState } from "react"

import {
    signIn,
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"

import './sign-in-form.styles.scss'

import FormInput from "../form-input/form-input.component"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const cleanForm = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocReference = await createUserDocumentFromAuth(user)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { user } = await signIn(email, password)
            console.log(user)
            cleanForm()
        } catch (error) {
            console.log(error)
            if (error.code == 'auth/user-not-found' ||
            error.code == 'auth/wrong-password'){
                alert("Wrong email or password")
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }


    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="buton" buttonType="google" onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm