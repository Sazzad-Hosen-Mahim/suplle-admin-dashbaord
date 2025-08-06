import { useEffect, useRef, useState } from "react";

const SuppleCard = ({
  Icon,
  category,
  title,
  description,
}: {
  Icon: React.ElementType;
  category: string;
  title: string;
  description: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [borderColor, setBorderColor] = useState("#504782");

  // Gradient color palette
  const colors = [
    "#8A2BE2", // Blue Violet
    "#9370DB", // Medium Purple
    "#9932CC", // Dark Orchid
    "#BA55D3", // Medium Orchid
    "#DA70D6", // Orchid
    "#EE82EE", // Violet
    "#FF00FF", // Magenta
  ];

  useEffect(() => {
    if (!cardRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });
      }
    };

    const card = cardRef.current;

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", () => setIsHovering(true));
    card.addEventListener("mouseleave", () => setIsHovering(false));

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", () => setIsHovering(true));
      card.removeEventListener("mouseleave", () => setIsHovering(false));
    };
  }, []);

  // Smooth color transition effect
  useEffect(() => {
    if (!isHovering) {
      setBorderColor("#504782");
      return;
    }

    let startTime: number;
    // let colorIndex = 0;
    let animationFrameId: number;

    const animateColors = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % 7000) / 7000; // 7 second cycle through all colors

      // Calculate intermediate color
      const currentIndex = Math.floor(progress * colors.length);
      const nextIndex = (currentIndex + 1) % colors.length;
      const localProgress = (progress * colors.length) % 1;

      const currentColor = colors[currentIndex];
      const nextColor = colors[nextIndex];

      // Simple RGB interpolation
      const interpolateColor = (
        color1: string,
        color2: string,
        factor: number
      ) => {
        const r1 = parseInt(color1.substring(1, 3), 16);
        const g1 = parseInt(color1.substring(3, 5), 16);
        const b1 = parseInt(color1.substring(5, 7), 16);

        const r2 = parseInt(color2.substring(1, 3), 16);
        const g2 = parseInt(color2.substring(3, 5), 16);
        const b2 = parseInt(color2.substring(5, 7), 16);

        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));

        return `#${((1 << 24) + (r << 16) + (g << 8) + b)
          .toString(16)
          .slice(1)}`;
      };

      setBorderColor(interpolateColor(currentColor, nextColor, localProgress));
      animationFrameId = requestAnimationFrame(animateColors);
    };

    animationFrameId = requestAnimationFrame(animateColors);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);

  return (
    <div
      ref={cardRef}
      className="lg:w-full lg:h-full flex flex-col gap-2 text-center p-5 rounded-2xl relative overflow-hidden"
      style={{
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 15px ${borderColor}`,
        transition: "border-color 0.3s linear, box-shadow 0.3s linear",
      }}
    >
      {/* Gradient background that follows cursor */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(90px at ${position.x}px ${position.y}px, rgba(80, 71, 130, 0.4), transparent 90%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-center items-center mx-auto text-gray-300 hover:text-black bg-[#191149] hover:bg-[#504782] rounded-full w-24 h-24 transition-all duration-300">
          <Icon
            size={54}
            className="text-primary group-hover:text-white transition-colors duration-300"
          />
        </div>
        <p className="text-gray-500 dark:text-gray-300">{category}</p>
        <h1 className="text-3xl text-white font-medium">{title}</h1>
        <p className="text-xl text-gray-400 px-5">{description}</p>
      </div>
    </div>
  );
};

export default SuppleCard;
