
import React from "react"
import { useNavigate } from "react-router-dom"

export default function userNavigate() {
    let instance = useNavigate()
    
    const navigate = (params) => {
        instance(params)
    }
}
