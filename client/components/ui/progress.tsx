import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-5 w-full overflow-hidden rounded-full border-2 border-purple-500 shadow-[0_2px_12px_rgba(168,85,247,0.15)] bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-indigo-900/40",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full flex-1 transition-all bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-progress-shine"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
