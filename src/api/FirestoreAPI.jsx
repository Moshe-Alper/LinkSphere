import { firestore } from "../firebaseConfig"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { toast } from "react-toastify"

let dbRef = collection(firestore, 'posts')

export const postStatus = async (object) => {
    addDoc(dbRef, object)
    .then(() => {
        toast.success("Document has been added successfully")
    })
    .catch((err) => {
        toast.error(err)
    })
}

export const getStatus = (setAllStatuses) => {
onSnapshot(dbRef, (response) => {
    setAllStatuses(
        response.docs.map((docs) => {
       return { ...docs.data(), id: docs.id}
    }))
})
}