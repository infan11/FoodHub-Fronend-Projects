import useAllUserHooks from "../../Hooks/useAllUserHooks";
import { MdOutlineAdminPanelSettings, MdOutlineRestaurant } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Input } from "@material-tailwind/react";

const Users = () => {
    const [users, , refetch] = useAllUserHooks();
    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const axiosSecure = useAxiosSecure();
    const TABLE_HEAD = ["Information" , "","Action", "Admin Role", "Moderator Role", "Owner Role"];

    // Filter users by tab and search
    const filteredUsers = users.filter((user) => {
        const userSearch =
            user.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchInput.toLowerCase());
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "admin" && user?.role === "admin") ||
            (activeTab === "moderator" && user?.role === "moderator") ||
            (activeTab === "owner" && user?.role === "owner");

        return userSearch && matchesTab;
    });

    // Delete User
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

    // Update Roles
    const handleAdmin = (userId) => {
        axiosSecure.patch(`/users/admin/${userId}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Successfully updated to Admin");
            }
        });
    };

    const handleModerator = (userId) => {
        axiosSecure.patch(`/users/moderator/${userId}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Successfully updated to Moderator");
            }
        }).catch(() => {
            toast.error("Failed to update user to Moderator");
        });
    };

    const handleOwner = (userId) => {
        axiosSecure.patch(`/users/restaurantOwner/${userId}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Successfully updated to Restaurant Owner");
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto min-h-full">
            {/* Header Section */}
            <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-[#ff1818] mt-4">Manage Users</h2>
                <div className="w-full px-4 md:w-64">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute h-3 w-3 text-[#ff1818] top-3 left-4" />
                        <Input
                            type="text"
                            className="input input-bordered w-full pl-10 text-[#ff1818]  font-bold"
                            placeholder="Search users..."
                            value={searchInput}
                            label="Search Users"
                            color="red"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs mb-4 flex justify-center md:justify-start">
                {["all", "admin", "moderator", "owner"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${
                            activeTab === tab
                                ? "tab-active bg-red-800 text-white font-bold rounded-full shadow-2xl"
                                : "text-red-900 font-extrabold"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-auto shadow-lg rounded-lg border">
                <table className="table-auto w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="px-4 py-2 text-[14px] text-[#ff1818]  tracking-wide text-center"  >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
  {filteredUsers.length > 0 ? (
    filteredUsers.map(({ _id, name, email, role, photo, 
        restaurantAdddress, 
        restaurantNumber }) => (
      <tr key={_id}>
        {/* Common Information */}
        <td className="px-4 py-2 border">
          <div className="flex items-center space-x-3">
            {role === "owner" ? (
              <img src={photo} alt={`${name}'s photo`} className="w-10 h-10 rounded-full object-cover" />
            ) : null}
            <div>
              <p>{name}</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </td>

        {/* Owner-Specific Details */}
        {role === "owner" ? (
          <td className="px-4 py-2 border">
            <p className="text-sm text-gray-500">Address: {restaurantAdddress || "N/A"}</p>
            <p className="text-sm text-gray-500">Number: {restaurantNumber || "N/A"}</p>
          </td>
        ) : (
          <td className="px-4 py-2 border text-center">—</td>
        )}

        {/* Action Buttons */}
        <td className="px-4 py-2 border">
          <button
            className="text-xl font-extrabold shadow-2xl"
            onClick={() => handleDelete(_id)}
          >
            <AiOutlineUserDelete />
          </button>
        </td>

        {/* Role-Specific Columns */}
        <td className="px-4 py-2 border">
          {role === "admin" ? (
            <span className="font-bold">Admin</span>
          ) : (
            <button
              className="text-xl font-extrabold shadow-2xl"
              onClick={() => handleAdmin(_id)}
            >
              <MdOutlineAdminPanelSettings />
            </button>
          )}
        </td>
        <td className="px-4 py-2 border">
          {role === "moderator" ? (
            <span className="font-bold">Moderator</span>
          ) : (
            <button
              className="text-xl font-extrabold shadow-2xl"
              onClick={() => handleModerator(_id)}
            >
              <MdOutlineAdminPanelSettings />
            </button>
          )}
        </td>
        <td className="px-4 py-2 border text-center">
                                        {role === "owner" ? (
                                            <span className="font-bold">Owner</span>
                                        ) : (
                                            <button
                                                className="text-xl font-extrabold shadow-2xl"
                                                onClick={() => handleOwner(_id)}
                                            >
                                                <MdOutlineRestaurant />
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
