import { BossesHero } from "@/components/bosses/BossesHero";
import { BossesList } from "@/components/bosses/BossesList";

export default function BossesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <BossesHero />
      <BossesList />
    </main>
  );
}
