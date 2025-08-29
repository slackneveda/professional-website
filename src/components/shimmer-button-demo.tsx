import { ThemedShimmerButton } from "@/components/themed-shimmer-button";
import { Upload, Plus, Download, Settings } from "lucide-react";

export function ShimmerButtonDemo() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Shimmer Button Variants</h2>
        <p className="text-muted-foreground mb-6">
          Theme-aware shimmer buttons that adapt to light and dark modes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Variant */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Primary</h3>
          <div className="space-y-2">
            <ThemedShimmerButton variant="primary" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </ThemedShimmerButton>
            <ThemedShimmerButton variant="primary" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </ThemedShimmerButton>
          </div>
        </div>

        {/* Secondary Variant */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Secondary</h3>
          <div className="space-y-2">
            <ThemedShimmerButton variant="secondary" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </ThemedShimmerButton>
            <ThemedShimmerButton variant="secondary" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </ThemedShimmerButton>
          </div>
        </div>

        {/* Outline Variant */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Outline</h3>
          <div className="space-y-2">
            <ThemedShimmerButton variant="outline" className="w-full">
              View Details
            </ThemedShimmerButton>
            <ThemedShimmerButton variant="outline" className="w-full">
              Learn More
            </ThemedShimmerButton>
          </div>
        </div>

        {/* Default Variant */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Default</h3>
          <div className="space-y-2">
            <ThemedShimmerButton variant="default" className="w-full">
              Cancel
            </ThemedShimmerButton>
            <ThemedShimmerButton variant="default" className="w-full">
              Close
            </ThemedShimmerButton>
          </div>
        </div>
      </div>

      {/* Size Variations */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Size Variations</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <ThemedShimmerButton variant="primary" className="px-3 py-1 text-sm">
            Small
          </ThemedShimmerButton>
          <ThemedShimmerButton variant="primary" className="px-4 py-2">
            Medium
          </ThemedShimmerButton>
          <ThemedShimmerButton variant="primary" className="px-6 py-3 text-lg">
            Large
          </ThemedShimmerButton>
        </div>
      </div>
    </div>
  );
}
