import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import HomeLayout from "@/components/layout/home-layout";
import { Metadata } from "next";
import { Pricing } from "@/components/layout/pricing";
import { HeroLanding } from "@/components/sections/hero-landing";
import { PreviewLanding } from "@/components/sections/preview-landing";
import { Powered } from "@/components/sections/powered";
import { BentoGrid } from "@/components/sections/bento-grid";
import { InfoLanding } from "@/components/sections/info-landing";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { infos } from "@/config/landing";

export const metadata: Metadata = {
  title: "Home | MyTems",
};

export default function Home() {
  return (
    <HomeLayout>
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <Features />
      <Testimonials />
    </HomeLayout>
  );
}
