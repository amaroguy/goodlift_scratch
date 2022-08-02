import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'

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
    const contextMenuID = uuid()
    setIsMenuShown.menuID = contextMenuID

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
        console.log('creating new event listeners!')
        document.addEventListener("click", closeContextMenu)
        reference.current.addEventListener("contextmenu", openContextMenu)
        
        return () => {
            testArr = new Set([...testArr].filter(fn => fn.menuID !== contextMenuID))
            document.removeEventListener("click", closeContextMenu)

        }
    })

    useEffect(() => {
        testArr.add(setIsMenuShown)
    },[])


    return {x, y, isMenuShown, closeContextMenu, openContextMenu}
}

export {testArr}
//props
// ref -> reference to the item that will be clicked
//
//
//