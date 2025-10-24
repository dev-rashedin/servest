const LoadingSkeleton = () => {
  return (
    <div className="scroll-container animate-pulse">
      <div className="scroll-content wall">
        {Array.from({ length: 1 }).map((_, idx) => (
          <div
            key={idx}
            className="space-y-4 min-h-[75vh] flex flex-col justify-center px-4 md:px-8"
          >
            <div className="h-12 md:w-11/12 lg:w-4/6 bg-muted/60 rounded-lg " />
            <div className="h-20  lg:w-5/6 bg-muted/60 rounded-lg mb-1" />
            <div className="h-40  lg:w-5/6 bg-muted/60 rounded-lg mb-1" />
            <div className="h-12 md:w-10/12 lg:w-3/4 bg-muted/60 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default LoadingSkeleton;
