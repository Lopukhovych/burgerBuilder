import React from 'react';
import {Link} from 'react-router-dom';
const notFound = () => {
    return (
        <div className='container pt-2 text-center'>
            <h2>404 Invalid Url</h2>
            <Link to='/'>Main</Link>
            <br/>
            <Link to='/auth'>Log In</Link>
        </div>
    );
};

export default notFound;
