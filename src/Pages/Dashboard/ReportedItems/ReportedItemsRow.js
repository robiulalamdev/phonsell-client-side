import React from 'react';
import { Link } from 'react-router-dom';

const ReportedItemsRow = ({ report }) => {
    const { serviceId, _id,
        reportText,
        seller,
        email,
        categoryId,
        brand,
        serviceName,
        reporterName,
        reporterImage,
        reporterEmail,
        image,
        price,
        location,
        sold,
        condition,
        used,
        originalPrice,
        model, authenticity, features, description, verify, time } = report
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img className="rounded-full w-8" src={image} width="40" height="40" alt="Alex Shatov" />
            </th>
            <td class="py-4 px-6">
                {serviceName}
            </td>
            <td class="py-4 px-6">
                {price}
            </td>
            <td class="py-4 px-6">
                {sold}
            </td>
            <td class="py-4 px-6">
                {location}
            </td>
            <td class="py-4 px-6">
                <Link className="text-left">
                    <button className='py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white'>View</button>
                </Link>
            </td>
            <td class="py-4 px-6">
                <Link className="text-left">
                    <button className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>
        </tr>
    );
};

export default ReportedItemsRow;