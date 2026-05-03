import { LocationsHero } from "@/components/locations/LocationsHero";
import { LocationsList } from "@/components/locations/LocationsList";

export default function LocationsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <LocationsHero />
      <LocationsList />
    </main>
  );
}
