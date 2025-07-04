import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup, 
    signOut
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const LoginApi = async (email, password) => {
    try {
        let response = await signInWithEmailAndPassword(auth, email, password)
        return response
    } 
    catch (err) {
        return err
    }
}
// change Api to API
export const RegisterApi = async (email, password) => {
    try {
        let response = await createUserWithEmailAndPassword(auth, email, password)
        return response
    } 
    catch (err) {
        return err
    }
}

export const GoogleSignInApi = async () => {
    try {
        let googleProvider = new GoogleAuthProvider()
        let res = await signInWithPopup(auth, googleProvider)
        return res
    } 
    catch (err) {
        return err
    }
}

export const onLogout = () => {
    try {
        signOut(auth)
    } catch (err) {
        return err
    }
}