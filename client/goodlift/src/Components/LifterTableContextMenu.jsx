import React, {useState} from 'react'
import './LifterTableContextMenu.css'

export default function LifterTableContextMenu({posX, posY, isShown, children}) {

    console.log("isShown is ", isShown)
    let menuDisplayStyle = {
        top: posY + "px",
        left: posX + "px",
        display: isShown ? "flex" : "none"
    }

    return(
            <div className="context-menu-container" style = {menuDisplayStyle}>
                <ul className = "context-menu-list">
                    {children}
                </ul>
            </div>
    )
}