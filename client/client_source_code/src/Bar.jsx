import React, {useState} from 'react'

export default function Bar() {

    function Baz(props){
        return <h1>{props.message}</h1>
    }

    const [testArr, setTestArr] = useState([<Baz sortVal={100} message={"This is the first Element"}/>, <Baz sortVal={300} message={"This is the Third Element"}/>, <Baz sortVal = {200} message={"This is the second element"}/>])

    function sortTestArr(){
        setTestArr(oldArr => {
            //1 for firstElement 2 for secondElement
            return [...oldArr].sort((firstElement, secondElement) => {
                return firstElement.props.sortVal > secondElement.props.sortVal ? 1 : -1
            })
        })
    }

    return (<>
        {testArr}
        <button onClick={() => sortTestArr()}> Sort </button> 
    </>)
}