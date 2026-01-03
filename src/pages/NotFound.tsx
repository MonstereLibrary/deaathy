import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRevealOnScroll<HTMLDivElement>();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div
        ref={containerRef}
        className="reveal-section text-center"
      >
        <h1 className="reveal-child mb-4 text-4xl font-bold" data-reveal-index="0">
          404
        </h1>
        <p className="reveal-child mb-4 text-xl text-muted-foreground" data-reveal-index="1">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="reveal-child text-primary underline hover:text-primary/90"
          data-reveal-index="2"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
