// import React, { useContext, useEffect } from 'react'
// import { AuthContext } from '../context/AuthContextProvider';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoutes = ({Component}) => {
//     const {user} = useContext(AuthContext);
//     const navigate = useNavigate()

//     useEffect(() => {
//          if (user === null) {
//             navigate("/login")
//             return
//         }
//     }, [user])
//    return (
//         <>
//             <Component />
//         </>
//     )
// }

// export default ProtectedRoutes
import React from 'react'

const ProtectedRoutes = () => {
  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes