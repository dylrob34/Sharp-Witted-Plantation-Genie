import React from 'react'
import '../css/Loader.css'
import { Spinner } from 'reactstrap'
const Loader = () => {
    return (  
        <div className = 'loader'>
            <Spinner color = 'primary' style={{ width: '4rem', height: '4rem' }}/>
        </div>
    );
}
 
export default Loader;