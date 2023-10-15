import ChatSection from "@/components/ChatSection";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="bg-lowlight dark:bg-primary">
      <div className="w-full max-w-[90rem] sm:mx-auto h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <ChatSection />
        </div>
      </div>
    </main>
  );
}
