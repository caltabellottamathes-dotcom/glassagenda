import React from "react";
import { Link } from "react-router-dom";
import { PageShell, Divider } from "@/components/glass";
import { SocialPulseWidget, SocialPlannerWidget, HouseholdWidget, PersonalAdminWidget, HobbiesWidget, FoodWidget } from "@/components/widgets/LifeWidgets";

export default function LifeGallery() {
  return (
    <PageShell>
      <div className="flex items-center justify-between mb-4">
        <div>
          <Link to="/" className="text-storm/50 hover:text-storm text-[11px] tracking-[0.2em] uppercase">← Terug naar OS</Link>
          <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight mt-2">LIFE • Galeri</h1>
          <p className="text-storm/55 text-sm mt-1">Alle LIFE-widgets, los van het OS.</p>
        </div>
        <Link to="/widgets" className="text-storm/50 hover:text-storm text-sm">Alle widgets →</Link>
      </div>
      <Divider className="mb-6" />
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        <SocialPulseWidget />
        <SocialPlannerWidget />
        <HouseholdWidget />
        <PersonalAdminWidget />
        <HobbiesWidget />
        <FoodWidget />
      </div>
    </PageShell>
  );
}