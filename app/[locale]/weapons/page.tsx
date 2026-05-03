import { WeaponsHero } from "@/components/weapons/WeaponsHero";
import { WeaponsList } from "@/components/weapons/WeaponsList";
import { HomeButton } from "@/components/ui/HomeButton";

export default function WeaponsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HomeButton />
      <WeaponsHero />
      <WeaponsList />
    </main>
  );
}
