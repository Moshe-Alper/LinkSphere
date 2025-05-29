import { firestore } from "../firebaseConfig"
import { addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { toast } from "react-toastify"

let postsRef = collection(firestore, "posts")
let userRef = collection(firestore, "users")

export const postStatus = async (object) => {
    addDoc(postsRef, object)
        .then(() => {
            toast.success("Post has been added successfully")
        })
        .catch((err) => {
            toast.error(err)
        })
}

export const getStatus = (setAllStatuses) => {
    onSnapshot(postsRef, (response) => {
        setAllStatuses(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            }))
    })
}

export const getSingleStatus = (setAllStatuses, id) => {
    const singlePostQuery = query(postsRef, where("userID", "==", id))
    onSnapshot(singlePostQuery, (response) => {
        setAllStatuses(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id}
            })
        )
    })
}

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email))
    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id }
            })[0]
        )
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
                    return { ...docs.data(), userID: docs.id }
                })
                .filter((item) => {
                    return item.email === currEmail
                })[0]
        )
    })
}

export const editProfile = (userID, payLoad) => {
    let userToEdit = doc(userRef, userID)
    updateDoc(userToEdit, payLoad)
        .then(() => {
            toast.success("Profile has been updated successfully")
        })
        .catch((err) => {
            console.error(err)
        })
}
