

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <main className="flex-1 p-3 sm:p-10">
          {children}
        </main>
     
  );
}
