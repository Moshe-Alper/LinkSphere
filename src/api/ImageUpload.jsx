import { storage } from "../firebaseConfig"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { editProfile } from "./FirestoreAPI"

export const uploadImage = (file, id) => {
    // Add validation
    if (!file) {
        console.error('No file provided for upload')
        return
    }
    
    if (!id) {
        console.error('No user ID provided for upload')
        return
    }

    const profilePicsRef = ref(storage, `profileImages/${file.name}`)
    const uploadTask = uploadBytesResumable(profilePicsRef, file)
    
    uploadTask.on("state_changed", 
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            console.log(`Upload progress: ${progress}%`)
        }, 
        (error) => {
            console.error('Upload error:', error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                editProfile(id, { imageLink: response })
            }).catch((error) => {
                console.error('Error getting download URL:', error)
            })
        }
    )
}