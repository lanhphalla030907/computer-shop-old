import React, { useState, useEffect } from 'react';
import { IoPersonOutline, IoCamera, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

const ProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: '',
    phone: '',
    fullName: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost/api/profile.php', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setFormData(response.data.user);
        if (response.data.user.profileImage) {
          setPreviewImage(`http://localhost/uploads/${response.data.user.profileImage}`);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // Add image if selected
      if (profileImage) {
        data.append('profile_image', profileImage);
      }

      const response = await axios.post('http://localhost/api/update_profile.php', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setMessage('Profile updated successfully!');
        setEditMode(false);
        
        // Update local storage if username changed
        if (response.data.user) {
          const updatedUser = { ...user, ...response.data.user };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        // Update preview image
        if (response.data.profileImage) {
          setPreviewImage(`http://localhost/uploads/${response.data.profileImage}`);
        }
      } else {
        setMessage(response.data.msg || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className=" text-white">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-blue-100 mt-2">Manage your account information</p>
          </div>

          <div className="p-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <IoPersonOutline className="text-6xl text-gray-400" />
                    </div>
                  )}
                </div>
                
                {editMode && (
                  <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                    <IoCamera className="text-xl" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message}
              </div>
            )}

            {/* Profile Form */}
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <IoMailOutline className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <IoPhonePortraitOutline className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      fetchUserProfile();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              /* View Mode */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="text-lg font-semibold mt-1">{formData.username || 'Not set'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-lg font-semibold mt-1">{formData.fullName || 'Not set'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold mt-1">{formData.email || 'Not set'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-semibold mt-1">{formData.phone || 'Not set'}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-lg font-semibold mt-1">{user.role || 'Admin'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;