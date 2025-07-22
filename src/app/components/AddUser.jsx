"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import UserList from './UserList';

export default function MyModal() {
    const USER_API_BASE_URL = "http://localhost:8080/api/users";
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
    });

    const [responseUser, setResponseUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
    });

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setUser({ ...user, [event.target.name]: value });
    };

    const saveUser = async (e) => {
        e.preventDefault();
        const response = await fetch(USER_API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const _user = await response.json();
        setResponseUser(_user);
        reset(e);
    };


    const reset = (e) => {
        e.preventDefault();
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            emailId: "",
        });
        setIsOpen(false);
    }

    return (
        <>
            <div className="container mx-auto my-6">
                <Button
                    onClick={open}
                    className="item-center rounded-md bg-blue-700 px-4 py-2 text-sm text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-blue-600"
                >
                    Add User
                </Button>

                <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl"
                            >
                                <DialogTitle as="h3" className="text-xl text-gray-950 text-center">
                                    Add New User
                                </DialogTitle>
                                <form onSubmit={saveUser}>
                                    <div className="max-w-md mx-auto">
                                        <div className="h-14 my-4">
                                            <label className="block text-gray-700">First Name</label>
                                            <input
                                                className='h-10 w-full border border-gray-300 rounded px-3 shadow my-2'
                                                value={user.firstName}
                                                type="text"
                                                name="firstName"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="h-14 my-4">
                                            <label className="block text-gray-700">Last Name</label>
                                            <input
                                                className='h-10 w-full border border-gray-300 rounded px-3 shadow my-2'
                                                value={user.lastName}
                                                type="text"
                                                name="lastName"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="h-14 my-8">
                                            <label className="block text-gray-700">Email Id</label>
                                            <input
                                                className='h-10 w-full border border-gray-300 rounded px-3 shadow my-2'
                                                value={user.emailId}
                                                type="email"
                                                name="emailId"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 space-x-2">
                                        <Button
                                            type="submit"
                                            className="inline-flex items-center gap-2 rounded-md bg-green-700 px-2 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-green-700"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-md bg-red-700 px-2 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-gray-700"
                                            onClick={reset}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>
            <UserList user={responseUser}/>
        </>
    )
}