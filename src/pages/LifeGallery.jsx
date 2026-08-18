import React from "react";
import { Link } from "react-router-dom";
import { PageShell, Divider } from "@/components/glass";
import { HobbiesWidget, HouseholdWidget, PersonalAdminWidget, SocialPlannerWidget, SocialPulseWidget, FoodWidget } from "@/components/widgets/LifeWidgets";

export default function LifeGallery() {
  return (
    <PageShell>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-storm text-2xl sm:text-3xl font-bold tracking-tight">LIFE — Widget Galerij</h1>
          <p className="text-storm/60 text-sm mt-1">De referentiestijl: foto + gelaagd glas + de inhoud bepaalt de vorm.</p>
        </div>
        <Link to="/widgets" className="text-storm/60 hover:text-storm text-sm">← Alle widgets</Link>
      </div>
      <Divider className="mb-6" />
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        <HobbiesWidget />
        <HouseholdWidget />
        <PersonalAdminWidget />
        <SocialPlannerWidget />
        <SocialPulseWidget />
        <FoodWidget />
      </div>
    </PageShell>
  );
}