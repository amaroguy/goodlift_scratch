import React, {useState} from "react";

function useContextMenu(){

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isMenuShown, setIsMenuShown] = useState(false)

    function openContextMenu(e, children){
        e.preventDefault()

        setX(e.pageX)
        setY(e.pageY)
        setIsMenuShown(true)
    }

    function closeContextMenu(){
        setIsMenuShown(false)
    }

    return {x, y, isMenuShown, openContextMenu, closeContextMenu}
}