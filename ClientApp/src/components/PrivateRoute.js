import React from 'react'
const ProtectedRoute = () => {
    return (  
        <div className = 'loader'>
            <Spinner color = 'primary' style={{ width: '4rem', height: '4rem' }}/>
        </div>
    );
}

export default ProtectedRoute