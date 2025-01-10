import useAuth from "../../Hooks/useAuth";

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
         Admin : {user?.name || user?.displayName}
         <br />
         Admin Email : {user?.email}
        </div>
    );
};

export default AdminHome;