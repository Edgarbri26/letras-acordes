import React from 'react';

const MisaCardSkeleton = () => {
    return (
        <div className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 animate-pulse">
            {/* Title skeleton */}
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            {/* Date skeleton */}
            <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            {/* Songs count skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-3"></div>
        </div>
    );
};

export default MisaCardSkeleton;
