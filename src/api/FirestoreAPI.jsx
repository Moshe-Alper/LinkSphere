import { firestore } from "../firebaseConfig"
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"

let dbRef = collection(firestore, "posts")
let userRef = collection(firestore, "users")

export const postStatus = async (object) => {
    addDoc(dbRef, object)
        .then(() => {
            toast.success("Post has been added successfully")
        })
        .catch((err) => {
            toast.error(err)
        })
}

export const getStatus = (setAllStatuses) => {
    onSnapshot(dbRef, (response) => {
        setAllStatuses(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            }))
    })
}

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => {

        })
        .catch((err) => {
            console.error(err)
        })
}

export const getCurrentUser = (setCurrentUser) => {
    let currEmail = localStorage.getItem("userEmail")
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs
                .map((docs) => {
                    return { ...docs.data(), userId: docs.id }
                })
                .filter((item) => {
                    return item.email === currEmail
                })[0]
        )
    })
}

export const editProfile = (userId, payLoad) => {
    let userToEdit = doc(userRef, userId)
    updateDoc(userToEdit, payLoad)
        .then(() => {
            toast.success("Profile has been updated successfully")
        })
        .catch((err) => {
            console.error(err)
        })
}
