import React, {memo} from 'react'
import './LifterTableContextMenu.css'
import deepEqual from 'deep-equal'

function LifterTableContextMenu({posX, posY, isShown, children}) {

    console.log("isShown is ", isShown)
    let menuDisplayStyle = {
        top: posY + "px",
        left: posX + "px",
        display: isShown ? "flex" : "none"
    }

    return (
        <div className="context-menu-container" style = {menuDisplayStyle}>
            <ul className = "context-menu-list">
                {children}
            </ul>
        </div>
    )
}

export default memo(LifterTableContextMenu, (oldProps, newProps) => {
    
    console.log('oldProps', oldProps)
    console.log('newProps', newProps)

    return deepEqual(oldProps, newProps, {strict: true})
}
)
