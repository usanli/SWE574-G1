"use client";

import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function IconsSetup() {
  // This function would normally generate icons, but for our demo
  // we'll just create placeholder SVGs
  const createPlaceholderIcons = () => {
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

    // This is just for demonstration - in a real app you'd use
    // a proper icon generator like next-pwa-icons or similar
    console.log("In a real app, you would generate these icon files:");
    sizes.forEach((size) => {
      console.log(`/public/icons/icon-${size}x${size}.png`);
    });
  };

  useEffect(() => {
    // Log information about icon setup when component mounts
    createPlaceholderIcons();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">PWA Icon Setup</h1>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>PWA Icons Required</AlertTitle>
        <AlertDescription>
          Your manifest.json references icons that need to be created and placed
          in the /public/icons/ directory.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Required Icons</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[72, 96, 128, 144, 152, 192, 384, 512].map((size) => (
            <div key={size} className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex h-20 items-center justify-center rounded bg-muted">
                <span className="text-sm text-muted-foreground">
                  {size}x{size}
                </span>
              </div>
              <p className="text-sm font-medium">
                icon-{size}x{size}.png
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">How to Generate Icons</h2>
        <div className="rounded-lg border p-4">
          <p className="mb-4">
            You have several options to generate the required icons:
          </p>
          <ol className="list-inside list-decimal space-y-2">
            <li>
              Use a tool like{" "}
              <a
                href="https://www.pwabuilder.com/imageGenerator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                PWA Image Generator
              </a>
            </li>
            <li>
              Use the{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                next-pwa-icons
              </code>{" "}
              npm package
            </li>
            <li>Create them manually from your logo using an image editor</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Testing PWA in Development</h2>
        <div className="rounded-lg border p-4">
          <p className="mb-4">To test PWA features in development:</p>
          <ol className="list-inside list-decimal space-y-2">
            <li>
              Temporarily modify your{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                next.config.js
              </code>{" "}
              to enable PWA in development
            </li>
            <li>
              Create a production build with{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                npm run build
              </code>{" "}
              and serve it with{" "}
              <code className="rounded bg-muted px-1 py-0.5">npm start</code>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
