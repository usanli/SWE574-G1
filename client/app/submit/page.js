import { Suspense } from "react";
import SubmitForm from "@/components/submit-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmitPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Submit a Mystery Object</h1>
        <p className="text-muted-foreground">
          Share your mysterious find with the community and get help identifying
          it
        </p>
      </div>

      <Suspense fallback={<SubmitFormSkeleton />}>
        <SubmitForm />
      </Suspense>
    </div>
  );
}

function SubmitFormSkeleton() {
  return (
    <div className="space-y-8 rounded-lg border bg-card p-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <Skeleton className="h-10 w-32" />
    </div>
  );
}
