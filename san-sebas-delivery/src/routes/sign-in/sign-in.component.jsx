import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"
import { async } from "@firebase/util"

    const SignIn = () =>{
        
    const logInGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocReference = await createUserDocumentFromAuth(user)

    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logInGoogleUser}>Sign in with Google popup</button>
        </div>
    )
}

export default SignIn