import { 
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils"

const SignIn = () =>{

    const logInGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocReference = await createUserDocumentFromAuth(user)

    }

    const logInGoogleRedirectUser = async () => {        
        const {user} = await signInWithGoogleRedirect()

        console.log(user)        
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logInGoogleUser}>Sign in with Google popup</button>
            <button onClick={logInGoogleRedirectUser}>Sign in with Google redirect</button>
        </div>
    )
}

export default SignIn