import { NpcsHero } from "@/components/npcs/NpcsHero";
import { NpcsList } from "@/components/npcs/NpcsList";
import { HomeButton } from "@/components/ui/HomeButton";

export default function NpcsPage() {
  return (
    <main className="bg-ds-bg min-h-screen">
      <NpcsHero />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <HomeButton />
        <NpcsList />
      </div>
    </main>
  );
}

