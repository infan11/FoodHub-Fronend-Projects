import React from 'react';
import useAuth from '../../Hooks/useAuth';

const ModeratorHome = () => {
    const {user }  = useAuth()
    return (
        <div>
          
            Moderator : {user?.name || user?.displayName}
            <br />
         Moderator Email : {user?.email}
        </div>
    );
};

export default ModeratorHome;