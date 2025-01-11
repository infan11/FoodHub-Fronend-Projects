import useAuth from "../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
       
          {
            user  ? <>
            user : {user?.name || user?.displayName}
         <br />
         user Email : {user?.email}
            </>: <> Your Not User Please Login Now </>
          }
        </div>
    );
};

export default UserHome;                           