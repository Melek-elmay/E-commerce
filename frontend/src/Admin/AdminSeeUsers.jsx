import React from 'react'

export default function AdminSeeUsers() {
    const [allusers, setallusers] = useState([]);

    const  deleteOneUser = function(id) {

    }




  return (
    <div>
       {allusers.map((elem)=>{
        <>
         <div>username: {elem.username}</div>
         <div>id: {elem.id}</div>
         <button onClick={()=>{
          deleteOneUser()
         }}>delete user</button>
         </>
       })}
    </div>
  )
}
