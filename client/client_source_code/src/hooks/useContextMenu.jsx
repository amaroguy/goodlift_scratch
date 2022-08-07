import React, {useState} from "react";
import { useEffect } from "react";

let closeLastMenuOpened = null

function useContextMenu(){

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isMenuShown, setIsMenuShown] = useState(false)
    const [children, setChildren] = useState([])

    function openContextMenu(e, children){
        e.preventDefault()

        if(closeLastMenuOpened){
            closeLastMenuOpened()
        }
        closeLastMenuOpened = () => closeContextMenu()

        setX(e.pageX)
        setY(e.pageY)
        setIsMenuShown(true)
        setChildren(children)
    }

    function closeContextMenu(){
        setIsMenuShown(false)
    }


    useEffect(() => {
            console.log('added event listener!')
            window.addEventListener('click', closeContextMenu)
    },[])

    return {x, y, isMenuShown, openContextMenu, closeContextMenu, children}
}

export default useContextMenu