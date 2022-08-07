import React, {useState, useEffect, useRef} from 'react'
import { io, Socket } from 'socket.io-client'
import { SOCKET_URL } from './util'

export default function Foo() {

    const [firstSocketMsg, setFirstSocketMsg] = useState("")
    const [secondSocketMsg, setSecondSocketMsg] = useState("")

    const firstSocketRef = useRef(null)
    const secondSocketRef = useRef(null)

    useEffect(() => {
        const firstSocket = io.connect(SOCKET_URL)
        const secondSocket = io.connect(SOCKET_URL)

        firstSocket.on('bar', (data) => {
            console.log(data.msg)
        })

        secondSocket.on('bar', (data) => {
            console.log(data.msg)
        })

        firstSocket.testFirstSocket = () => {
            firstSocket.emit('foo', {msg: "This is coming from the first socket"})
        }

        secondSocket.testSecondSocket = () =>{
            secondSocket.emit('foo', {msg: "This is coming from the second socket"})
        }

        firstSocketRef.current = firstSocket
        secondSocketRef.current = secondSocket

    }, [])




    return (
        <>
            <button onClick = {() => firstSocketRef.current.testFirstSocket()}> Test first socket </button>
            <button onClick = {() => secondSocketRef.current.testSecondSocket()}> Test second socket </button> 
        </>
    )
}