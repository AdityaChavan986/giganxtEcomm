'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import InvoiceButtonWrapper from "@/components/InvoiceButtonWrapper";

const MyOrders = () => {
    const { currency, getToken, user } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Create a consistent date format function
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                setOrders(data.orders.reverse());
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'processing':
                return '⚙️';
            case 'shipped':
                return '🚚';
            case 'delivered':
                return '✅';
            case 'cancelled':
                return '❌';
            default:
                return '📦';
        }
    };

    const getOrderProgress = (status) => {
        switch (status) {
            case 'pending':
                return 25;
            case 'processing':
                return 50;
            case 'shipped':
                return 75;
            case 'delivered':
                return 100;
            case 'cancelled':
                return 0;
            default:
                return 0;
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span>Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span>{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{currency}{order.amount}</p>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-gray-600">Date : {formatDate(order.date)}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{getStatusIcon(order.status)}</span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    {order.status !== 'cancelled' && (
                                        <div className="flex flex-col gap-1">
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-500 ${
                                                        order.status === 'delivered' ? 'bg-green-500' :
                                                        order.status === 'shipped' ? 'bg-purple-500' :
                                                        order.status === 'processing' ? 'bg-blue-500' :
                                                        'bg-yellow-500'
                                                    }`}
                                                    style={{ width: `${getOrderProgress(order.status)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    {order.status === 'delivered' && (
                                        <div className="mt-2">
                                            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-700 mb-2">Your order has been delivered!</span>
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <InvoiceButtonWrapper order={order} currency={currency} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;