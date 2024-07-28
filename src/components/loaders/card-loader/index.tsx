
const CardShimmerLoader = () => {
    return (
        <div className="animate-pulse max-w-xs mx-auto overflow-hidden rounded-lg shadow-md bg-white w-[300px] aspect-w-9 aspect-h-16">
            <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default CardShimmerLoader;
