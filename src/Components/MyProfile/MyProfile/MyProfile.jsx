import { useState, useContext, useRef } from "react";
import { FcBusinessman } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { imageUpload } from "../../Hooks/imageHooks";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(user?.photoURL || "");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store file in state
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Open File Picker on Image Click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    let imageUrl = profileImage; // Default to current profile image

    if (selectedFile) {
      try {
        const imageData = await imageUpload(selectedFile);
        imageUrl = imageData?.data?.display_url || "";
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
        return;
      }
    }

    handleUpdateUser(name, imageUrl);
  };

  // Update Firebase Profile
  const handleUpdateUser = (name, photo) => {
    updateUserProfile({ displayName: name, photoURL: photo })
      .then(() => {
        setProfileImage(photo);
        setPreviewImage("");
        setSelectedFile(null); // Reset file state after update
        toast.success("Profile Updated Successfully");
        navigate("/myProfile");
      })
      .catch((error) => {
        console.error("Update profile error:", error);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-11/12 md:w-8/12 lg:w-6/12 border border-cyan-300 rounded-lg shadow-xl p-10">
        
        {/* Profile Image Section */}
        <div className="relative w-40 h-40 mx-auto">
          <img
            className="w-full h-full rounded-full object-cover border-4 border-gray-300 cursor-pointer transition duration-300 hover:opacity-70"
            src={previewImage || profileImage || "default-profile.png"}
            alt="Profile"
            onClick={handleImageClick}
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition duration-300 cursor-pointer"
            onClick={handleImageClick}
          >
            Choose File
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          name="photo"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Profile Update Form */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          {/* Email Field */}
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              className="block py-2 px-4 w-full bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue={user?.email}
              readOnly
            />
          </div>

          {/* Name Field */}
          <div className="relative w-full">
            <input
              type="text"
              name="name"
              className="block py-2 px-4 w-full bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue={user?.displayName}
              required
            />
          </div>

          {/* Update Profile Button */}
          <button
            type="submit"
            className="w-full bg-[#ff0000d8] text-white py-2 rounded-lg font-semibold shadow-md hover:bg-[#ff0000d8] transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
