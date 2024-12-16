import useAllUserHooks from "../../Hooks/useAllUserHooks";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Users = () => {
   const [users , refetch] = useAllUserHooks();
    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const axiosSecure = useAxiosSecure();

    const TABS = [
        { label: "User", value: "all" },
        { label: "Admin", value: "admin" },
    ];

    const TABLE_HEAD = ["Information", "Action", "Role"];

    // Filter search and tabs logic
    const filterSearch = users.filter((user) => {
        const userSearch =
            user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.email.toLowerCase().includes(searchInput.toLowerCase());
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "admin" && user.role === "admin");

        return userSearch && matchesTab;
    });

    // Delete user function
    const handleDelete = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then((res) => {
                        console.log("User deleted", res.data);
                        refetch()
                        Swal.fire("Deleted!", "The user has been deleted.", "success");
                 
                    })
             
                    .catch((err) => {
                        console.error(err);
                        Swal.fire("Error!", "Failed to delete the user.", "error");
                    });
            
            }
        });
    };

    return (
        <div>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Members List
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" size="sm">
                                View All
                            </Button>
                          <Link to={"/register"}>
                          <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Member
                            </Button>
                          </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs
                            value={activeTab}
                            className="w-full md:w-max"
                            onChange={(value) => setActiveTab(value)}
                        >
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filterSearch.length > 0 ? (
                                filterSearch.map(({ _id, name, email, role }, index) => {
                                    const isLast = index === filterSearch.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={_id}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <button
                                                        className="btn"
                                                        onClick={() => handleDelete(_id)}
                                                    >
                                                        <AiOutlineUserDelete />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-xl"
                                                >
                                                    <MdOutlineAdminPanelSettings />
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={TABLE_HEAD.length}
                                        className="p-4 text-center text-blue-gray-500"
                                    >
                                        Unavailable User
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default Users;
