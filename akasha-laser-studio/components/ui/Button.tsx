import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-sans font-medium tracking-wide transition-all duration-300 ease-premium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal-500 text-ivory-100 hover:bg-charcoal-400 shadow-soft",
        secondary:
          "border border-charcoal-500 text-charcoal-500 bg-transparent hover:bg-charcoal-500 hover:text-ivory-100",
        ghost:
          "text-charcoal-500 hover:bg-champagne-100/80 border border-transparent",
        light:
          "bg-ivory-100 text-charcoal-500 hover:bg-champagne-100 shadow-soft",
        link: "text-charcoal-500 underline underline-offset-4 decoration-taupe-300 hover:decoration-charcoal-500 p-0 h-auto",
      },
      size: {
        default: "h-12 px-7 text-[13px] uppercase tracking-widest2",
        sm: "h-10 px-5 text-xs uppercase tracking-widest2",
        lg: "h-14 px-9 text-sm uppercase tracking-widest2",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, external, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
