import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FaSave, FaCamera, FaShieldAlt, FaGlobe, FaShoppingCart,
  FaUsers, FaCalendarAlt, FaMoneyCheckAlt, FaChartLine,
  FaUserFriends, FaBoxOpen, FaCog, FaBell, FaSearch,
  FaTachometerAlt, FaStore, FaShippingFast, FaTags, FaGamepad,
  FaDesktop, FaUser, FaLock, FaHistory, FaPlus, FaEdit,
  FaTrash, FaPhone, FaEnvelope, FaMoneyBillWave
} from "react-icons/fa";

export default function AdminProfile() {
  const { data, adminInfo } = useOutletContext();
  const recentOrders = data?.latest || [];
  
  // Load saved profile from localStorage on initial render
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: adminInfo.name,
    email: adminInfo.email,
    phone: "+855 96 265 7233",
    bio: "Administrator of KEMIK Gaming Store",
    profileImage: "",
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("adminProfile"));
    if (savedProfile) {
      setEditProfileForm(prev => ({
        ...prev,
        ...savedProfile
      }));
    }
  }, []);

  function handleEditProfileChange(e) {
    const updatedForm = {
      ...editProfileForm,
      [e.target.name]: e.target.value,
    };
    setEditProfileForm(updatedForm);
    
    // Save to localStorage on every change
    localStorage.setItem("adminProfile", JSON.stringify(updatedForm));
  }

  function handleSaveProfile() {
    // Update user data in localStorage
    const user = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        username: editProfileForm.name,
        email: editProfileForm.email,
      }),
    );

    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB for localStorage)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfile = {
          ...editProfileForm,
          profileImage: reader.result,
        };
        setEditProfileForm(newProfile);
        
        // Save image to localStorage
        localStorage.setItem("adminProfile", JSON.stringify(newProfile));
      };
      reader.readAsDataURL(file);
    }
  }

  // Reset to default values
  function handleResetProfile() {
    const defaultProfile = {
      name: adminInfo.name,
      email: adminInfo.email,
      phone: "+855 12 345 678",
      bio: "Administrator of KEMIK Gaming Store",
      profileImage: "",
    };
    
    setEditProfileForm(defaultProfile);
    localStorage.setItem("adminProfile", JSON.stringify(defaultProfile));
    
    // Update user data too
    const user = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        username: adminInfo.name,
        email: adminInfo.email,
      }),
    );
    
    alert("Profile reset to default!");
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar with Upload */}
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl shadow relative overflow-hidden">
              {editProfileForm.profileImage ? (
                <img
                  src={editProfileForm.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                adminInfo.name.charAt(0)
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>

            {/* Upload Button */}
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
              <FaCamera className="text-sm" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Info */}
          <div className="flex-1">
            {isEditingProfile ? (
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={editProfileForm.name}
                  onChange={handleEditProfileChange}
                  className="text-3xl font-bold bg-gray-100 px-4 py-2 rounded-lg w-full"
                  placeholder="Your name"
                />
                <input
                  type="email"
                  name="email"
                  value={editProfileForm.email}
                  onChange={handleEditProfileChange}
                  className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg w-full"
                  placeholder="your@email.com"
                />
                <input
                  type="text"
                  name="phone"
                  value={editProfileForm.phone}
                  onChange={handleEditProfileChange}
                  className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg w-full"
                  placeholder="Phone number"
                />
                <textarea
                  name="bio"
                  value={editProfileForm.bio}
                  onChange={handleEditProfileChange}
                  className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg w-full"
                  placeholder="Your bio"
                  rows="2"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {editProfileForm.name}
                </h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {adminInfo.role}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                  {editProfileForm.profileImage && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Photo Saved
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-1">{editProfileForm.email}</p>
                <p className="text-gray-600 text-sm">{editProfileForm.phone}</p>
                <p className="text-gray-500 mt-2">{editProfileForm.bio}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {isEditingProfile ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaEdit /> Edit Profile
                </button>
                <button
                  onClick={handleResetProfile}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  title="Reset to default values"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info - Editable */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaUser className="text-blue-600" /> Personal Information
            </h3>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <div>
                  <p className="font-medium">Email</p>
                  {isEditingProfile ? (
                    <input
                      type="email"
                      name="email"
                      value={editProfileForm.email}
                      onChange={handleEditProfileChange}
                      className="text-gray-600 bg-white px-3 py-1 rounded border w-full"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm">{editProfileForm.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaPhone className="text-gray-400" />
                <div>
                  <p className="font-medium">Phone</p>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      name="phone"
                      value={editProfileForm.phone}
                      onChange={handleEditProfileChange}
                      className="text-gray-600 bg-white px-3 py-1 rounded border w-full"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm">{editProfileForm.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="font-medium">Joined Date</p>
                  <p className="text-gray-600 text-sm">{adminInfo.joinDate}</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FaUserFriends className="text-gray-400" />
                <p className="font-medium">Bio</p>
              </div>
              {isEditingProfile ? (
                <textarea
                  name="bio"
                  value={editProfileForm.bio}
                  onChange={handleEditProfileChange}
                  className="text-gray-600 bg-white px-3 py-2 rounded border w-full"
                  rows="3"
                />
              ) : (
                <p className="text-gray-600 text-sm">{editProfileForm.bio}</p>
              )}
            </div>

           
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaLock className="text-green-600" /> Security
          </h3>

          <div className="space-y-4">
            {/* Password Change */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Change Password</p>
                <span className="text-sm text-green-600">Strong</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">Last changed 30 days ago</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <FaLock /> Change Password
              </button>
            </div>

            {/* 2FA */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Two-Factor Authentication</p>
                <span className="text-sm text-red-600">Disabled</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">Add extra security</p>
              <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Enable 2FA
              </button>
            </div>

            {/* Login History */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <FaHistory className="text-purple-600" />
                <p className="font-medium">Recent Logins</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Today</span>
                  <span className="text-green-600">✓ Current session</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yesterday</span>
                  <span className="text-gray-500">Phnom Penh, KH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">3 days ago</span>
                  <span className="text-gray-500">10:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCog className="text-yellow-600" /> Account Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Notification Settings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaBell className="text-blue-600" />
                <p className="font-medium">Notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-gray-600 text-sm">Receive email notifications</p>
          </div>

          {/* Email Settings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-green-600" />
                <p className="font-medium">Marketing Emails</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <p className="text-gray-600 text-sm">Receive promotional emails</p>
          </div>

          {/* Privacy Settings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-red-600" />
                <p className="font-medium">Profile Privacy</p>
              </div>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Public</option>
                <option>Private</option>
                <option>Only Admin</option>
              </select>
            </div>
            <p className="text-gray-600 text-sm">Who can see your profile</p>
          </div>

          {/* Language Settings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaGlobe className="text-purple-600" />
                <p className="font-medium">Language</p>
              </div>
              <select className="border rounded px-2 py-1 text-sm">
                <option>English</option>
                <option>Khmer</option>
              </select>
            </div>
            <p className="text-gray-600 text-sm">Interface language</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaHistory className="text-purple-600" /> Recent Activity
          </h3>
          <button className="text-blue-600 text-sm hover:text-blue-800">View All</button>
        </div>

        <div className="space-y-3">
          {recentOrders.slice(0, 3).map((order, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaShoppingCart className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New Order #{1000 + index}</p>
                  <p className="text-gray-600 text-sm">
                    From {order.name} • ${order.total} • {order.payment}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}