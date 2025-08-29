import React, { useEffect, useState } from "react";
import { ShimmerButton, ShimmerButtonProps } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";

interface ThemedShimmerButtonProps extends Omit<ShimmerButtonProps, 'background' | 'shimmerColor'> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

export const ThemedShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ThemedShimmerButtonProps
>(({ variant = 'default', className, children, ...props }, ref) => {
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);
  
  // Get solid, high-contrast colors based on variant and theme
  const getVariantStyles = (variant: string, isDark: boolean) => {
    switch (variant) {
      case 'primary':
        return {
          background: '#3B82F6', // Solid blue background
          shimmerColor: '#FFFFFF',
          className: 'text-white font-semibold shadow-lg hover:shadow-xl border-0'
        };
      case 'secondary':
        return {
          background: isDark ? '#4B5563' : '#6B7280', // Solid gray background
          shimmerColor: '#FFFFFF',
          className: 'text-white font-semibold shadow-lg hover:shadow-xl border-0'
        };
      case 'outline':
        return {
          background: isDark ? '#1F2937' : '#FFFFFF',
          shimmerColor: '#3B82F6',
          className: 'text-blue-600 dark:text-blue-400 font-semibold border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30'
        };
      default:
        return {
          background: isDark ? '#374151' : '#F3F4F6', // Dark gray for dark mode, light gray for light mode
          shimmerColor: isDark ? '#D1D5DB' : '#374151',
          className: isDark ? 'text-gray-100 font-semibold border-0' : 'text-gray-800 font-semibold border-0'
        };
    }
  };

  const variantStyles = getVariantStyles(variant, isDark);

  return (
    <ShimmerButton
      ref={ref}
      background={variantStyles.background}
      shimmerColor={variantStyles.shimmerColor}
      shimmerDuration="3s"
      borderRadius="0.5rem"
      className={cn(
        variantStyles.className,
        "transition-all duration-200 relative",
        className
      )}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
});

ThemedShimmerButton.displayName = "ThemedShimmerButton";
