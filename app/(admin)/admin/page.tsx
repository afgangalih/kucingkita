// app/(admin)/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-black italic tracking-tighter">
        HALO, ADMIN! 👋
      </h1>
      <p className="mt-4 text-muted-foreground">
        Selamat datang di pusat kendali KucingKita.id. 
        Di sini Anda akan mengelola data ras kucing dan konten lainnya.
      </p>
      
      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <div className="p-6 bg-primary/10 rounded-[2rem] border-2 border-primary/20">
          <h3 className="font-bold">Total Ras</h3>
          <p className="text-3xl font-black">24</p>
        </div>
        {/* Tambahkan kartu statistik lainnya di sini nanti */}
      </div>
    </div>
  )
}