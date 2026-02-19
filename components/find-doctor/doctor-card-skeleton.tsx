export default function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-[20px] shadow-sm p-6 flex flex-col items-center text-center h-full border border-gray-100 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="w-32 h-32 mb-4 rounded-full bg-gray-200"></div>

      {/* Name Skeleton */}
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>

      {/* Bio Skeleton */}
      <div className="w-full flex flex-col gap-2 mb-4">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 mx-auto bg-gray-200 rounded"></div>
        <div className="h-3 w-4/6 mx-auto bg-gray-200 rounded"></div>
      </div>

      {/* Specialty Skeleton */}
      <div className="h-8 w-1/2 bg-gray-200 rounded-full mb-6"></div>

      {/* Button Skeleton */}
      <div className="w-full h-10 bg-gray-200 rounded-full mt-auto"></div>
    </div>
  );
}
