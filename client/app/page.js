import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Discover Mysterious Objects</h1>
        <p className="text-muted-foreground mb-4">
          Welcome to the community-driven platform for identifying mysterious
          objects. Share your findings and help others identify their
          discoveries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content will go here in the future */}
          <div className="border rounded-lg p-6 h-64 flex items-center justify-center bg-muted/50">
            <p className="text-center text-muted-foreground">
              Object posts will appear here
            </p>
          </div>
          <div className="border rounded-lg p-6 h-64 flex items-center justify-center bg-muted/50">
            <p className="text-center text-muted-foreground">
              Object posts will appear here
            </p>
          </div>
          <div className="border rounded-lg p-6 h-64 flex items-center justify-center bg-muted/50">
            <p className="text-center text-muted-foreground">
              Object posts will appear here
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
