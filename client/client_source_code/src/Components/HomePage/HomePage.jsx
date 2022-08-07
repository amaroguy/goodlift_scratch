import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <h1>A free small-scale powerlifting meet manager, completely in your browser</h1>
            <h1> Home page has not been built yet, start managing your meet <Link to = {{pathname: "/manage"}}> here </Link> </h1>
        </>
    )
}
