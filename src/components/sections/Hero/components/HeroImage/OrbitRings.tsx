export function OrbitRings() {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full animate-spin-slow opacity-20">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8 8"
        />
      </svg>
      <svg className="absolute inset-0 w-full h-full animate-spin-reverse opacity-10">
        <circle
          cx="50%"
          cy="50%"
          r="38%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 12"
        />
      </svg>
    </>
  );
}
