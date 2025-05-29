import { useEffect } from 'react';


function UserHome() {

    const token = localStorage.getItem('userblogtoken')

    useEffect(()=>{
  if(!token){
    navigate('/login')
    
    return
  }
})
  return (
    <div>
      <h1>this is user home page</h1>
    </div>
  )
}

export default UserHome
