import React, {useState} from 'react'

export default function RefConnectForm({setIsInRoom, roomID, setRoomID, username, setUsername}){
    const [errorMsg, setErrorMsg] = useState("")

    function logRefIn(){

        if(roomID === ""){
            setErrorMsg("The Room ID cannot be empty!")
            return
        } 

        setIsInRoom(true)
    }


    return (
        <>
        
            <h2>Connect To A Judge Light Room</h2>
            { errorMsg !== "" && <h3 className="error-msg">{errorMsg}</h3>}
            <input type="text" placeholder="Room ID" value={roomID} onChange = {(e) => setRoomID(e.target.value)} style = {{margin: "10px"}}/>
            <input type="text" placeholder= "Username" value= {username} onChange = {(e) => setUsername(e.target.value)} style = {{margin: "10px"}}/>

            <h2> Select Judge Role </h2> 
            <button>Judge 1 </button>
            <button>Judge 2</button>
            <button>Judge 3</button>
            <br/> 
            <button onClick={logRefIn} style = {{backgroundColor: "salmon", marginTop: "20px"}}> Log In! </button>
        </>
    )
}