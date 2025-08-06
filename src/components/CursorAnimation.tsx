import { useEffect, useRef, useState } from "react";

interface CursorAnimationWrapperProps {
  children: React.ReactNode;
}

const CursorAnimationWrapper = ({ children }: CursorAnimationWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const lastMousePosition = useRef({ clientX: 0, clientY: 0 });

  // Debounce function to limit event handler frequency
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Update position based on mouse or scroll
  const updatePosition = (clientX: number, clientY: number) => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      // Only update if position has changed significantly to avoid jitter
      if (Math.abs(x - position.x) > 1 || Math.abs(y - position.y) > 1) {
        setPosition({ x, y });
      }
    }
  };

  // Handle mouse/pointer movement
  const handlePointerMove = debounce((e: PointerEvent) => {
    lastMousePosition.current = { clientX: e.clientX, clientY: e.clientY };
    updatePosition(e.clientX, e.clientY);
  }, 10); // Debounce to 10ms for smooth updates

  // Handle scroll to update position
  const handleScroll = debounce(() => {
    const { clientX, clientY } = lastMousePosition.current;
    updatePosition(clientX, clientY);
  }, 5);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;

    // Add pointermove and scroll listeners
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll);
    wrapper.addEventListener("mouseenter", () => setIsHovering(true));
    wrapper.addEventListener("mouseleave", () => setIsHovering(false));

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      wrapper.removeEventListener("mouseenter", () => setIsHovering(true));
      wrapper.removeEventListener("mouseleave", () => setIsHovering(false));
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className={`absolute inset-0 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(90px at ${position.x}px ${position.y}px, rgba(80, 71, 130, 0.4), transparent 90%)`,
          zIndex: 5,
          transition: "opacity 0.3s ease", // Only transition opacity
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CursorAnimationWrapper;
