import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

// Define types for User and API responses if needed
interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
}

const UserManagement: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: ''
    });

    useEffect(() => {
        // Fetch users from API
        axios.get('http://localhost:8080/api/users')

            .then(response => setUsers(response.data.data))

            .catch(error => console.error('Error fetching users:', error));
    }, []);


    const handleAddUser = () => {
        axios.post('http://localhost:8080/api/users/register', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setShowAddModal(false);
                setNewUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    role: ''
                });
            })
            .catch(error => console.error('Error adding user:', error));
    };

    const handleEditUser = () => {
        if (editingUser) {
            axios.put(`http://localhost:8080/api/users/${editingUser.id}`, editingUser)
                .then(response => {
                    setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
                    setShowEditModal(false);
                    setEditingUser(null);
                })
                .catch(error => console.error('Error updating user:', error));
        }
    };

    const handleDeleteUser = (userId: number) => {
        axios.delete(`http://localhost:8080/api/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleLogout = () => {
        // Perform logout operations if needed, then navigate to the home page
        navigate('/');
    };



    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <header className="header">
                <div className="container header-container">
                    <a className="logo" href="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon">
                            <path
                                d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
                        </svg>
                        <span className="logo-text">Computer Shop</span>
                    </a>
                    <div className="search-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="search-icon">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.3-4.3"/>
                        </svg>
                        <input className="search-input" placeholder="Search products..." type="search"/>
                    </div>

                    <nav className="nav">
                        <a className="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <Link to="/add-products" style={{
                                color: "black"
                            }}>
                                <span>Add Products</span>
                            </Link>
                        </a>
                        <a className="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path d="m7.5 4.27 9 5.15"/>
                                <path
                                    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                                <path d="m3.3 7 8.7 5 8.7-5"/>
                                <path d="M12 22V12"/>
                            </svg>
                            <Link to="/add-users" style={{
                                color: "black"
                            }}>
                                <span>Add User</span>
                            </Link>
                        </a>

                    </nav>

                    <div className="auth-buttons">
                        <button className="auth-button login-button" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                                <polyline points="10 17 15 12 10 7"/>
                                <line x1="15" x2="3" y1="12" y2="12"/>
                            </svg>
                            <span>Logout</span>
                        </button>
                        <button className="auth-button cart-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <circle cx="8" cy="21" r="1"/>
                                <circle cx="19" cy="21" r="1"/>
                                <path
                                    d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                            </svg>
                            <Link to="/cart" style={{
                                color: "white"
                            }}>
                                <span>Cart</span>
                            </Link>
                        </button>
                        <button className="auth-button favorite-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <Link to="/wishlist" style={{
                                color: "white"
                            }}>
                                <span>Wishlist</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </header>
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">User
                    Management</h3>
                <div className="ml-auto">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div className="p-6 table-container">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&amp;_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">First
                                Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Last
                                Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Email</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Phone
                                Number
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Role</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="[&amp;_tr:last-child]:border-0">
                        {users.map(user => (
                            <tr key={user.id}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted table-row">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.firstName}</td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.lastName}</td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.email}</td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.phoneNumber}</td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.role}</td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingUser(user);
                                                setShowEditModal(true);
                                            }}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                                            </svg>
                                            <span className="sr-only">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-red-500 hover:text-white h-10 w-10"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <path d="M6 7h12"></path>
                                                <path d="M9 7v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                                                <path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"></path>
                                                <path d="M10 12v6"></path>
                                                <path d="M14 12v6"></path>
                                            </svg>
                                            <span className="sr-only">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="text-lg font-semibold">Add User</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddUser();
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="First Name"
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={newUser.phoneNumber}
                                onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                required
                                className="input-field"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white rounded-md px-4 py-2"
                            >
                                Add User
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-500 text-white rounded-md px-4 py-2"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="text-lg font-semibold">Edit User</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEditUser();
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="First Name"
                                value={editingUser.firstName}
                                onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={editingUser.lastName}
                                onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="password"
                                value={editingUser.password}
                                onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                                required
                                className="input-field"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={editingUser.phoneNumber}
                                onChange={(e) => setEditingUser({...editingUser, phoneNumber: e.target.value})}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={editingUser.role}
                                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                required
                                className="input-field"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white rounded-md px-4 py-2"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowEditModal(false)}
                                className="bg-gray-500 text-white rounded-md px-4 py-2"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
