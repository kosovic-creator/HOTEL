import { Skeleton } from '@hotel/ui/ui/skeleton';

const LoadingPage = () => {
  return (
    <div className="w-full py-6 px-2 sm:px-4 lg:px-8">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-10 w-full sm:w-32 rounded-lg" />
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="flex bg-gray-50 dark:bg-gray-800 border-b">
          <Skeleton className="flex-1 h-12 border-r last:border-r-0" />
          <Skeleton className="flex-1 h-12 border-r last:border-r-0" />
          <Skeleton className="flex-1 h-12 border-r last:border-r-0" />
          <Skeleton className="flex-1 h-12" />
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Skeleton className="flex-1 h-12 border-r last:border-r-0" />
            <Skeleton className="flex-1 h-12 border-r last:border-r-0" />
            <Skeleton className="flex-1 h-12 border-r last:border-r-0" />
            <Skeleton className="flex-1 h-12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
