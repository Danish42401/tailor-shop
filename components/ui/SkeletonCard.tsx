'use client';

export function SkeletonCard() {
    return (
        <div className="rounded-2xl overflow-hidden bg-surface dark:bg-surface-dark animate-pulse">
            {/* Image area */}
            <div className="aspect-[3/4] bg-purple-100 dark:bg-purple-950" />

            {/* Content area */}
            <div className="p-4 space-y-3">
                {/* Badge placeholder */}
                <div className="h-5 w-16 bg-purple-100 dark:bg-purple-950 rounded-full" />
                {/* Title */}
                <div className="h-4 bg-purple-100 dark:bg-purple-950 rounded w-3/4" />
                <div className="h-4 bg-purple-100 dark:bg-purple-950 rounded w-1/2" />
                {/* Price */}
                <div className="h-6 bg-purple-100 dark:bg-purple-950 rounded w-24" />
                {/* Button */}
                <div className="h-10 bg-purple-200 dark:bg-purple-900 rounded-xl" />
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
