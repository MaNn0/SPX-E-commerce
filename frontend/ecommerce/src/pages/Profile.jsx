import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiUser, FiMail, FiEdit, FiCheck } from 'react-icons/fi';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = sessionStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email
                });
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const token = sessionStorage.getItem('access_token');
            await axios.patch('http://localhost:8000/users', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(formData);
            setEditMode(false);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update profile');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        </div>
    );

    if (!user) return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <div className="text-center py-8 text-gray-600">
                No user data found
            </div>
        </div>
    );

    return (
        <div className=" bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-blue-100">{user.email}</p>
                            </div>
                            <button
                                onClick={() => editMode ? handleSave() : setEditMode(true)}
                                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                            >
                                {editMode ? (
                                    <>
                                        <FiCheck /> Save
                                    </>
                                ) : (
                                    <>
                                        <FiEdit /> Edit Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiUser className="text-blue-500" /> Personal Information
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">First Name</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="mt-1 text-lg font-medium text-gray-900">{user.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Last Name</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="mt-1 text-lg font-medium text-gray-900">{user.lastName}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiMail className="text-blue-500" /> Contact Information
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Email Address</label>
                                    {editMode ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="mt-1 text-lg font-medium text-gray-900">{user.email}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}