import Button from "../../components/button/button.component"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import SignInForm from "../../components/sign-in-form/sign-in-form.component"

import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"
import { async } from "@firebase/util"

    const Authentication = () =>{
        
    return(
        <div>
            <h1>Sign In Page</h1>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication