import { PricingCards } from "@/components/sections/pricing-cards";
import { PricingFaq } from "@/components/sections/pricing-faq";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/contexts/use-session";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  const { user } = useSession();

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      {/* <PricingCards userId={user?.id} subscriptionPlan={"subscriptionPlan"} /> */}
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
