'use client'
import React from 'react';
import { useCart } from '../context/CartContext';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Cart() {
    const [open, setOpen] = useState(true)
    const { cartItems, removeFromCart } = useCart();
    // console.log(cartItems);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0  bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl pt-25">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img alt={product.name} src={product.product.image_url} className="size-full object-cover" />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <Link to={'/product.product.id'}>{product.product.name}</Link>
                                                                    </h3>
                                                                    <p className="ml-4">{product.product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                {/* <p className="text-gray-500">Qty {product.product.quantity}</p> */}

                                                                <div className="flex">
                                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                                                        onClick={() => removeFromCart(product)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>

                                        <p>
                                            {cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0) >= 100 ? (<>
                                                <span className="text-sm text-green-600">Free Shipping </span>$
                                                {(
                                                    cartItems.reduce(
                                                        (total, item) => total + item.product.price * item.quantity,
                                                        0
                                                    )
                                                ).toFixed(2)}
                                            </>
                                            ) : (
                                                <>
                                                    <span className='text-sm text-gray-500'>Shipping $20 + </span>
                                                    ${(
                                                        20 +
                                                        cartItems.reduce(
                                                            (total, item) => total + item.product.price * item.quantity,
                                                            0
                                                        )
                                                    ).toFixed(2)}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
