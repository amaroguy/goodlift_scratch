import React, {useContext} from 'react'
import {LifterContext} from './LifterContext.jsx'


function AddLifterButton() {
    const {addBlankLifter} = useContext(LifterContext)

    return (
        <button onClick={addBlankLifter}> Add A New Lifter </button>
    )
}

export default AddLifterButton