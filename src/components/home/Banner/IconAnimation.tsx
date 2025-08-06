import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const IconAnimation = () => {
  const [icons, setIcons] = useState([
    { id: 1, color: "white" },
    { id: 2, color: "white" },
    { id: 3, color: "white" },
  ]);

  useEffect(() => {
    let animationFrame: number;
    let timers: NodeJS.Timeout[] = [];

    const startAnimation = () => {
      // Clear any existing timers
      timers.forEach((timer) => clearTimeout(timer));
      timers = [];

      // First icon: white → green → white
      timers.push(
        setTimeout(
          () => setIcons((prev) => updateIcon(prev, 1, "#540595")),
          200
        )
      );
      timers.push(
        setTimeout(() => setIcons((prev) => updateIcon(prev, 1, "white")), 800)
      );

      // Second icon: white → green → white
      timers.push(
        setTimeout(
          () => setIcons((prev) => updateIcon(prev, 2, "#540595")),
          500
        )
      );
      timers.push(
        setTimeout(() => setIcons((prev) => updateIcon(prev, 2, "white")), 1100)
      );

      // Third icon: white → green → white
      timers.push(
        setTimeout(
          () => setIcons((prev) => updateIcon(prev, 3, "#540595")),
          800
        )
      );
      timers.push(
        setTimeout(() => setIcons((prev) => updateIcon(prev, 3, "white")), 1400)
      );

      // Schedule the next animation cycle
      timers.push(
        setTimeout(() => {
          animationFrame = requestAnimationFrame(startAnimation);
        }, 2000)
      );
    };

    const updateIcon = (prevIcons: typeof icons, id: number, color: string) => {
      return prevIcons.map((icon) =>
        icon.id === id ? { ...icon, color } : icon
      );
    };

    // Start the initial animation
    startAnimation();

    // Cleanup function
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      {icons.map((icon) => (
        <FaChevronDown
          key={icon.id}
          className={`text-5xl transition-colors duration-200 ${
            icon.color === "white" ? "text-white" : "text-[#540595]"
          }`}
        />
      ))}
    </div>
  );
};

export default IconAnimation;
