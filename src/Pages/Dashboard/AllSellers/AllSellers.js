import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import AllSellersRow from './AllSellersRow';

const AllSellers = () => {
    const { user } = useContext(AuthContext)

    // load wishlist
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/all-sellers')
            const data = await res.json()
            return data
        }
    })

    console.log(sellers);

    // remove wishlist
    const handleRemoveSeller = (id) => {
        fetch(`http://localhost:5000/all-sellers/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Seller Remove Successfully')
                    refetch()
                }
            })
    }


    // handleVerify
    const handleVerify = (id) => {
        fetch(`http://localhost:5000/all-sellers/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller Verified Successfully')
                    refetch()
                }
                // console.log(data);
            })
    }

    if (isLoading) {
        return <div className='flex justify-center min-h-screen p-6'><SyncLoader color="#36d7b7" /></div>
    }
    return (
        <div className=' bg-white dark:bg-gray-800 min-h-screen py-12 px-6'>
            <div class="overflow-x-auto relative w-full md:max-w-[700px] mx-auto">
                <header className="py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800 dark:text-white">All Sellers</h2>
                </header>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                IMAGE
                            </th>
                            <th scope="col" class="py-3 px-6">
                                NAME
                            </th>
                            <th scope="col" class="py-3 px-6">
                                EMAIL
                            </th>
                            <th scope="col" class="py-3 px-6">
                                ROLE
                            </th>
                            <th scope="col" class="py-3 px-6">
                                VERIFY
                            </th>
                            <th scope="col" class="py-3 px-6">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map(seller => <AllSellersRow
                                key={seller._id}
                                seller={seller}
                                handleRemoveSeller={handleRemoveSeller}
                                handleVerify={handleVerify}
                            ></AllSellersRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                sellers.length === 0 &&
                <h1 className='text-center dark:text-white text-xl mt-3 font-bold'>No Sellers</h1>
            }
        </div>
    );
};

export default AllSellers;