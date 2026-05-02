export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg text-center space-y-3">
        <h1 className="text-2xl font-semibold">Trenutno ste offline</h1>
        <p className="text-sm text-muted-foreground">
          Nema internet konekcije. Kada se mreza vrati, stranica ce automatski ponovo ucitati sadrzaj.
        </p>
      </div>
    </main>
  );
}
