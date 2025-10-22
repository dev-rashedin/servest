const LoadingSkeleton = () => {
  return (
    <div className="scroll-container animate-pulse">
      <div className="scroll-content wall">
        {Array.from({ length: 1 }).map((_, idx) => (
          <div key={idx} className="space-y-4 min-h-[75vh] flex flex-col justify-center ">
            <div className="h-12 w-4/6 bg-muted/60 rounded-lg " />
            <div className="h-20 w-5/6 bg-muted/60 rounded-lg mb-1" />
            <div className="h-40 w-5/6 bg-muted/60 rounded-lg mb-1" />
            <div className="h-12 w-3/4 bg-muted/60 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default LoadingSkeleton;
