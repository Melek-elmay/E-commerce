import React from 'react'

export default function History() {
    const [allCarts, setallCarts] = useState();
    


  return (
    <div>
        {allCarts.map((elem)=>{
            <>
            <div>
                <h2>{elem.id}</h2>
                
            </div>
            </>
        })}
    </div>
  )
}
