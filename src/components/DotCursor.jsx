import React, { useEffect, useRef } from "react";

const DotCursor = () => {
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const speed = 0.23;

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const target = e.target;
      // Existing hover effect for scaling (if element has .dot-hover-effect)
      if (target?.closest(".dot-hover-effect")) {
        dotRef.current?.classList.add("dot-hovered");
      } else {
        dotRef.current?.classList.remove("dot-hovered");
      }

      // Add inversion effect when over elements with .cursor-invert-effect
      if (target?.closest(".cursor-invert-effect")) {
        dotRef.current?.classList.add("dot-invert");
      } else {
        dotRef.current?.classList.remove("dot-invert");
      }
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={dotRef} className="dot-cursor" />;
};

export default DotCursor;
