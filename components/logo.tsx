import { cn } from "@/lib/utils";

// The Tomorrow's Tech mark: a rounded speech bubble with two dot "eyes",
// recreated as a simple inline SVG (matches the mascot's chest badge and
// the HQ signage in the brand reference images).
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M32 6C17.6406 6 6 15.9847 6 28.2857C6 35.5335 9.98341 41.9648 16.1943 46.0323C16.6194 46.3106 16.8841 46.7803 16.8562 47.2875L16.5325 53.1305C16.4762 54.1519 17.5754 54.8256 18.4661 54.3128L26.2258 49.8397C26.5842 49.6335 27.0087 49.5675 27.4145 49.6497C28.8952 49.9505 30.4292 50.1102 32 50.1102C46.3594 50.1102 58 40.1255 58 27.8245C58 15.5236 46.3594 6 32 6Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="27" r="4.2" fill="currentColor" />
      <circle cx="40" cy="27" r="4.2" fill="currentColor" />
    </svg>
  );
}
