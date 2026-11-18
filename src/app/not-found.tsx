import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="theme-stage container-x flex min-h-[100svh] flex-col justify-end pb-16 pt-40">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 max-w-4xl font-display text-display-lg text-balance">
        This page has left the building.
      </h1>
      <p className="mt-6 max-w-md text-bone/70">The link may be old, or the event may have moved. The archive has everything we have made.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/#events">See upcoming events</Button>
        <Button href="/" variant="outline">
          Home
        </Button>
      </div>
    </section>
  );
}
