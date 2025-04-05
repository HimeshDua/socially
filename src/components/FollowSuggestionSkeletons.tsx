// Skeleton.tsx
export function Skeleton() {
  return (
    <div className="space-y-4">
      {/* Skeleton for User Avatar */}
      <div className="flex gap-2 items-center justify-between animate-pulse">
        <div className="flex items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-gray-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shine"></div>
          </div>{' '}
          {/* Avatar skeleton */}
          <div className="text-xs space-y-2">
            <div className="w-20 h-4 bg-gray-300 rounded relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shine"></div>
            </div>{' '}
            {/* Name skeleton */}
            <div className="w-16 h-3 bg-gray-300 rounded relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shine"></div>
            </div>{' '}
            {/* Username skeleton */}
            <div className="w-24 h-3 bg-gray-300 rounded relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shine"></div>
            </div>{' '}
            {/* Followers count skeleton */}
          </div>
        </div>
        <div className="w-24 h-8 bg-gray-300 rounded relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shine"></div>
        </div>{' '}
        {/* Follow button skeleton */}
      </div>
    </div>
  );
}
