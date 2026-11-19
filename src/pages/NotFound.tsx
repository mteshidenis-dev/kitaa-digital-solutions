import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-32">
      <div className="w-full max-w-3xl rounded-[2rem] border border-primary/10 bg-card p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-accent/12 text-accent">
          <Compass className="h-8 w-8" />
        </div>
        <p className="mt-6 text-sm uppercase tracking-[0.26em] text-muted-foreground">404 Error</p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-0.04em] text-foreground md:text-6xl">That page does not exist in this template.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          The route <span className="font-semibold text-foreground">{location.pathname}</span> could not be found. Head back to the homepage or continue through the main service pages.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button size="lg" className="h-14 rounded-full px-7 text-base font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return home
            </Button>
          </Link>
          <Link to="/services">
            <Button size="lg" variant="outline" className="h-14 rounded-full border-primary/15 bg-background px-7 text-base font-semibold">
              View services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
