import { 
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    auth 
} from "../../utils/firebase/firebase.utils"

import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"
import { async } from "@firebase/util"

    const SignIn = () =>{

    useEffect(()=>{
        async function fetchData(){
            const response = await getRedirectResult(auth)
            if (response){
                const userdocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        fetchData()
    },[])
        
    const logInGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocReference = await createUserDocumentFromAuth(user)

    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logInGoogleUser}>Sign in with Google popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button>
        </div>
    )
}

export default SignIn