import { firestore } from "../firebaseConfig"
import { addDoc, collection, doc, onSnapshot, query, updateDoc, where, setDoc, deleteDoc } from "firebase/firestore"
import { toast } from "react-toastify"

let postsRef = collection(firestore, "posts")
let userRef = collection(firestore, "users")
let likeRef = collection(firestore, "likes")
let commentsRef = collection(firestore, "comments")

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

export const getAllUsers = () => {
    
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

export const likePost = (userId, postId, isLiked) => {
    try {
    let docToLike = doc(likeRef, `${userId}_${postId}`)
    if (isLiked) {
        deleteDoc(docToLike)
    } else setDoc(docToLike, { userId, postId })
    } catch (err) {
        console.error("err:", err)
    }
}

export const getLikesByUser = (userId, postId, setIsLiked, setLikesCount) => {
    if (!postId) {
        console.error("postId is undefined");
        return;
    }
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId))

        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data())
            let likesCount = likes?.length

            const isLiked = likes.some((like) => like.userId === userId)
            
            setLikesCount(likesCount)
            setIsLiked(isLiked)
        })
    } catch (err) {
        console.error("err:", err)
    }
}

export const postComment = (postId, comment, timeStamp, name) => {
    try {
        addDoc(commentsRef, {
            postId,
            comment,
            timeStamp,
            name
        })
    } catch (err) {
    console.error("Error posting comment:", err)
    }
}
export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentsRef, where('postId', '==', postId))
        
        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(comment => comment.comment && comment.comment.trim() !== "")
            setComments(comments)
        })
    } catch (err) {
        console.error('Error getting comment', err)
    }
}
