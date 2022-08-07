import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'

let testArr = new Set()
let closeLastMenuOpened = null
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
let usingContextMenu = false

function useContextMenu(reference){

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isMenuShown, setIsMenuShown] = useState(false)
    const contextMenuID = uuid()
    setIsMenuShown.menuID = contextMenuID

    function closeContextMenu(e){
        if(isMenuShown){
            setIsMenuShown(false)
        }
    }

    function openContextMenu(e) {
        e.preventDefault()

        if(closeLastMenuOpened){
            closeLastMenuOpened()
        }

        closeLastMenuOpened = () => setIsMenuShown(false)

        setX(e.pageX)
        setY(e.pageY)
        setIsMenuShown(true)
    }

    useEffect(() => {
        window.addEventListener("click", closeContextMenu)    
        return () => {
            testArr = new Set([...testArr].filter(fn => fn.menuID !== contextMenuID))
        }
    })

    useEffect(() => {
        testArr.add(setIsMenuShown)
    },[])


    return {x, y, isMenuShown, closeContextMenu, openContextMenu}
}

//props
// ref -> reference to the item that will be clicked
//
//
//