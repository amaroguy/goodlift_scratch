import React, { useEffect, useState } from 'react'

let testArr = new Set()

/**
 * Takes in a reference object from useRef() hook
 * 
 * State keeps track of its position on the screen and visibility
 * 
 * Every time it is called, the setter function for visibility is stored
 * in the testArr, allowing us to iterate through them to close all context menus
 * before opening a new one, this is implemented in closeAllContextMenus() 
 * 
 */

/**
 * POSSIBLE REFACTOR 
 * Integrate useRef somehow instead of it having to be called and passed in
 * outside of the hook
 */
export function useContextMenu(reference){

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isMenuShown, setIsMenuShown] = useState(false)

    function closeContextMenu(e){
        if(isMenuShown){
            setIsMenuShown(false)
        }
    }

    function closeAllContextMenus(){
        testArr.forEach((fn) => {
            fn(false)
        })
    }


    function openContextMenu(e) {
        e.preventDefault()
        closeAllContextMenus()
        setX(e.pageX)
        setY(e.pageY)
        setIsMenuShown(true)
    }

    useEffect(() => {
        document.addEventListener("click", closeContextMenu)
        reference.current.addEventListener("contextmenu", openContextMenu)
        
        return () => {
            document.removeEventListener("click", closeContextMenu)
            reference.current.removeEventListener("contextmenu", openContextMenu)
        }
    })

    useEffect(() => {
        testArr.add(setIsMenuShown)
    },[])


    return {x, y, isMenuShown, closeContextMenu}
}

export {testArr}
//props
// ref -> reference to the item that will be clicked
//
//
//