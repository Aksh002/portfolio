import { CometCard } from "@/components/ui/comet-card";
import { cn } from "@/lib/utils";

export default function CometCardDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <CometCard className={className} rotateDepth={12} translateDepth={10}>
      <div
        className={cn(
          "group relative my-4 w-[19rem] overflow-hidden rounded-[30px] md:my-6 md:w-[23rem]",
        )}
        aria-label="Akshit Gangwar image card"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
        >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[30px]">
          <img
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-[30px] object-cover transition duration-500 group-hover:scale-[1.02]"
            alt="Akshit image card background"
            src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style={{
              boxShadow: "0 22px 42px rgba(8, 12, 22, 0.12)",
              opacity: 1,
            }}
          />
        </div>
      </div>
    </CometCard>
  );
}
