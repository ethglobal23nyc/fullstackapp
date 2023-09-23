export default function AppLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-78.5 0 413 413"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle cx="100" cy="100" r="95" fill="none" stroke="black" strokeWidth="2" />

        <circle cx="60" cy="60" r="15" fill="black" />
        <circle cx="80" cy="80" r="15" fill="black" />
        <line x1="60" y1="60" x2="80" y2="80" stroke="black" strokeWidth="2" />

        <path
          d="M120 40 C160 20, 160 80, 120 60, C80 40, 80 0, 120 20"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />

        <path d="M40 140 Q50 120 60 140 T80 140" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="50" cy="130" r="5" fill="black" />
        <circle cx="70" cy="130" r="5" fill="black" />

        <path d="M130 140 Q140 120 150 140 T170 140" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="140" cy="130" r="5" fill="black" />
        <circle cx="160" cy="130" r="5" fill="black" />
      </g>
    </svg>
  )
}
