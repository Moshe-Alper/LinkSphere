import { storage } from "../firebaseConfig.js"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { editProfile } from "./FirestoreAPI.js"

export const uploadImage = (file, id, setModalOpen, setProgress, setCurrentImage) => {
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
           setProgress(progress)
        }, 
        (error) => {
            console.error('Upload error:', error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                editProfile(id, { imageLink: response })
                setModalOpen(false)
                setCurrentImage({})
                setProgress(0)
            }).catch((error) => {
                console.error('Error getting download URL:', error)
            })
        }
    )
}

export const uploadPostImage = (file, setPostImage, setProgress) => {
    if (!file) {
        console.error('No file provided for upload')
        return
    }

    const postPicsRef = ref(storage, `postImages/${file.name}`)
    const uploadTask = uploadBytesResumable(postPicsRef, file)
    
    uploadTask.on("state_changed", 
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
           setProgress(progress)
        }, 
        (error) => {
            console.error('Upload error:', error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                setPostImage(response)
            }).catch((error) => {
                console.error('Error getting download URL:', error)
            })
        }
    )
}
