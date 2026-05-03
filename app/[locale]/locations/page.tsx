import { LocationsHero } from "@/components/locations/LocationsHero";
import { LocationsList } from "@/components/locations/LocationsList";
import { HomeButton } from "@/components/ui/HomeButton";

export default function LocationsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HomeButton />
      <LocationsHero />
      <LocationsList />
    </main>
  );
}
