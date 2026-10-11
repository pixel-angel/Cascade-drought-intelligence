const points = [
  { id: "R1", x: 70, y: 55, color: "#10B981" },
  { id: "S1", x: 175, y: 100, color: "#10B981" },
  { id: "R2", x: 285, y: 45, color: "#F59E0B" },
  { id: "F1", x: 300, y: 160, color: "#F59E0B" },
  { id: "S2", x: 155, y: 205, color: "#EF4444" },
  { id: "F2", x: 390, y: 205, color: "#10B981" },
];

const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 3],
  [1, 4],
  [3, 4],
  [3, 5],
];

export default function BasinVisual() {
  return (
    <svg
      viewBox="0 0 460 260"
      className="h-auto w-full"
      role="img"
      aria-label="Illustrative watershed with connected reservoirs, sensors, and farms"
    >
      <defs>
        <pattern
          id="cascade-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#10B981"
            strokeOpacity=".12"
            strokeWidth=".6"
          />
        </pattern>
        <linearGradient id="cascade-flow" x1="0" x2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <rect width="460" height="260" fill="url(#cascade-grid)" />

      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx="230"
          cy="130"
          rx={95 + i * 42}
          ry={42 + i * 30}
          fill="none"
          stroke="#10B981"
          strokeOpacity=".10"
          strokeDasharray="3 8"
        />
      ))}

      {connections.map(([a, b]) => {
        const from = points[a];
        const to = points[b];

        return (
          <g key={`${a}-${b}`}>
            <path
              d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2 + 12} ${(from.y + to.y) / 2 - 8} ${to.x} ${to.y}`}
              fill="none"
              stroke="url(#cascade-flow)"
              strokeOpacity=".6"
              strokeWidth="1.8"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {points.map((point) => (
        <g key={point.id}>
          <circle
            cx={point.x}
            cy={point.y}
            r="13"
            fill={point.color}
            fillOpacity=".10"
          />
          <circle cx={point.x} cy={point.y} r="5" fill={point.color} />
          <circle
            cx={point.x}
            cy={point.y}
            r="8"
            fill="none"
            stroke={point.color}
            strokeOpacity=".75"
          />
          <text
            x={point.x}
            y={point.y - 14}
            fill="#B7CFC5"
            fontSize="9"
            textAnchor="middle"
            letterSpacing="1"
          >
            {point.id}
          </text>
        </g>
      ))}
    </svg>
  );
}
