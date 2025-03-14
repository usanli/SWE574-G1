"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MobileInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Check if it's iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    // Check if we've already prompted the user (using localStorage)
    setHasPrompted(localStorage.getItem("installPromptShown") === "true");

    // Listen for the beforeinstallprompt event (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Save the event for later use
      setDeferredPrompt(e);

      // Only show the prompt if we haven't shown it before
      if (localStorage.getItem("installPromptShown") !== "true") {
        setShowPrompt(true);
        localStorage.setItem("installPromptShown", "true");
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show the prompt for iOS users after a delay
    if (!hasPrompted && isIOS && !isStandalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
        localStorage.setItem("installPromptShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [hasPrompted, isIOS, isStandalone]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setShowPrompt(false);
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the saved prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Install NameThatFor.me</DialogTitle>
          <DialogDescription>
            {isIOS
              ? "Add this app to your home screen for a better experience. Tap the share button and then 'Add to Home Screen'."
              : "Install this app on your device for a better experience and offline access."}
          </DialogDescription>
        </DialogHeader>

        {isIOS && (
          <div className="flex flex-col items-center space-y-2 py-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-muted p-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L6.5 11H17.5L12 2Z" fill="currentColor" />
                  <path d="M17.5 22H6.5V11H17.5V22Z" fill="currentColor" />
                </svg>
              </div>
              <span>Tap the share button</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-muted p-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="2"
                    fill="currentColor"
                  />
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span>Then "Add to Home Screen"</span>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={dismissPrompt}>
            Maybe later
          </Button>

          {!isIOS && (
            <Button onClick={handleInstall} className="mt-2 sm:mt-0">
              <Download className="mr-2 h-4 w-4" />
              Install App
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
