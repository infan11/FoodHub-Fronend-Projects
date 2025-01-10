import React from 'react';
import useAuth from '../../Hooks/useAuth';

const OwnerHome = () => {
    const {user} = useAuth();
    return (
        <div>
           
             OwnerHome : {user?.name || user?.displayName}
         <br />
          OwnerHome Email : {user?.email}
        </div>
    );
};

export default OwnerHome;