export interface Dashboard {
  readonly title: string;
  readonly focus: string;
  readonly href: string;
}

export const tableauProfile = "https://public.tableau.com/app/profile/rajanee.shenkar3444/vizzes";

const viz = (path: string) => `https://public.tableau.com/app/profile/rajanee.shenkar3444/viz/${path}`;

export const dashboards: readonly Dashboard[] = [
  {
    title: "Worldwide Energy Analysis",
    focus:
      "Long-run consumption trends, with solar and hydro set against nuclear, geothermal and biofuel across decades.",
    href: viz("WorldwideEnergyAnalysis/Story1"),
  },
  {
    title: "Solar & Hydro Energy Production",
    focus:
      "A story that walks from worldwide solar and hydro production through to where that power is actually consumed.",
    href: viz("SolarHydroEnergyProduction/Story"),
  },
  {
    title: "Energy Distribution Analysis",
    focus:
      "Solar, hydro and wind output compared side by side across ten major economies, split by source.",
    href: viz("EnergyDistributionAnalysis/Story"),
  },
  {
    title: "Global Renewable Energy Trends",
    focus:
      "Renewable share by country on a choropleth, with production over time and filters for country, source and chart type.",
    href: viz("GlobalRenewableEnergyTrends_17730735759630/Dashboard1"),
  },
] as const;
