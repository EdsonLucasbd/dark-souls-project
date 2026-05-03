import { NpcDetail } from "@/components/npcs/NpcDetail";

export default function NpcPage() {
  return (
    <main className="bg-ds-bg min-h-screen pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <NpcDetail />
      </div>
    </main>
  );
}