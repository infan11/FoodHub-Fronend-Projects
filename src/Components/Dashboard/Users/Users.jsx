import useAllUserHooks from "../../Hooks/useAllUserHooks";
import { MdOutlineAdminPanelSettings, MdOutlineRestaurant } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useOwnerUser from "../../Hooks/useOwnerUser";
import { Input } from "@material-tailwind/react";

const Users = () => {
    const [users, refetch] = useAllUserHooks();
    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const axiosSecure = useAxiosSecure();
    const TABLE_HEAD = ["Information", "Action", "Role", "moderator"];

    // Filter users by tab and search
    const filteredUsers = users.filter((user) => {
        const userSearch =
            user.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.roleTwo?.toLowerCase().includes(searchInput.toLowerCase()) ;
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "admin" && user.role === "admin") ;
            (activeTab === "moderator" && user.roleTwo === "moderator") ;

        return userSearch && matchesTab;
    });

    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/users/${user}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Deleted!", "The user has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete the user.", "error");
                    });
            }
        });
    };

    const handleAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Successfully updated to Admin");
            }
        });
    };
    const handleModarator = (user) => {
        axiosSecure.patch(`/users/moderator/${user}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Successfully updated to Admin");
            }
        });
    };

 
    return (
        <div className="max-w-7xl mx-auto min-h-full">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Manage Users</h2>
                <div className="w-64">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute h-5 w-5 text-red-900 top-3 left-3" />
                        <Input
                            type="text"
                            className="input input-bordered w-full pl-10 text-red-500 font-bold"
                            placeholder="Search users..."
                            value={searchInput}
                            label="Search Users"
                            color="orange"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs  mb-4">
                <button
                    className={`tab ${activeTab === "all" ? "tab-active bg-red-500  text-white font-bold rounded-full shadow-2xl" : " text-red-900 font-extrabold"}`}
                    onClick={() => setActiveTab("all")}
                >
                    All Users
                </button>
                <button
                    className={`tab ${activeTab === "admin" ? "tab-active bg-red-500  text-white font-bold rounded-full shadow-2xl" : " text-red-900 font-extrabold"}`}
                    onClick={() => setActiveTab("admin")}
                >
                    Admins
                </button>
               
                
            </div>

            {/* Table */}
            <div className="overflow-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="px-4 py-2 border">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(({ _id, name, email, role,  roleTwo }, index) => (
                                <tr key={_id} className="">
                                    <td className="px-4 py-2 border">
                                        <div>
                                            <p>{name}</p>
                                            <p className="text-sm text-gray-500">{email}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            className="text-xl font-extrabold shadow-2xl  "
                                            onClick={() => handleDelete(_id)}
                                        >
                                            <AiOutlineUserDelete />
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {role === "admin" ? (
                                            <span className="font-bold">Admin</span>
                                        ) : (
                                            <button
                                                className="text-xl font-extrabold shadow-2xl "
                                                onClick={() => handleAdmin(_id)}
                                            >
                                                <MdOutlineAdminPanelSettings />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {roleTwo === "moderator" ? (
                                            <span className="font-bold">Moderator</span>
                                        ) : (
                                            <button
                                                className="text-xl font-extrabold shadow-2xl "
                                                onClick={() => handleModarator(_id)}
                                            >
                                                <MdOutlineAdminPanelSettings />
                                            </button>
                                        )}
                                    </td>
                                   
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={TABLE_HEAD.length} className="text-center py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
