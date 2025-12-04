import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Kun én variant: square
const buttonVariants = cva(
  "inline-flex items-center justify-center aspect-square h-8 w-8 transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-white mt-6! cursor-pointer ",

  // jeg har fjernet variants, da vi ikke har brug for det
);

function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
