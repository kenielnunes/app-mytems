"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { HeaderSection } from "../shared/header-section";
import { Icons } from "../icons";
import { Check, DoorClosed, X } from "lucide-react";
import {
  BillingFormButton,
  UserSubscriptionPlan,
} from "../form/billing-form-button";
import { pricingData } from "@/config/subscriptions";
import { useSigninModal } from "../hooks/use-signin-modal";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.interval || subscriptionPlan.interval === "year"
      ? true
      : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const signInModal = useSigninModal();

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="container flex flex-col items-center text-center">
      <HeaderSection label="Pricing" title="Start at full speed !" />

      <div className="mb-4 mt-10 flex items-center gap-5">
        <span>Monthly Billing</span>
        <Switch
          checked={isYearly}
          onCheckedChange={toggleBilling}
          role="switch"
          aria-label="switch-year"
        />
        <span>Annual Billing</span>
      </div>

      <div className="mx-auto grid max-w-screen-lg gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {pricingData.map((offer) => (
          <div
            className="relative flex flex-col overflow-hidden rounded-xl border"
            key={offer.title}
          >
            <div className="min-h-[150px] items-start space-y-4 bg-secondary/70 p-6">
              <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {offer.title}
              </p>

              <div className="flex flex-row">
                <div className="flex items-end">
                  <div className="flex text-left text-3xl font-semibold leading-6">
                    {isYearly && offer.prices.monthly > 0 ? (
                      <>
                        <span className="mr-2 text-muted-foreground line-through">
                          ${offer.prices.monthly}
                        </span>
                        <span>${offer.prices.yearly / 12}</span>
                      </>
                    ) : (
                      `$${offer.prices.monthly}`
                    )}
                  </div>
                  <div className="-mb-1 ml-2 text-left text-sm font-medium">
                    <div>/mo</div>
                  </div>
                </div>
              </div>
              {offer.prices.monthly > 0 ? (
                <div className="text-left text-sm text-muted-foreground">
                  {isYearly
                    ? `$${offer.prices.yearly} will be charged when annual`
                    : "when charged monthly"}
                </div>
              ) : null}
            </div>

            <div className="flex h-full flex-col justify-between gap-16 p-6">
              <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                {offer.benefits.map((feature) => (
                  <li className="flex items-start" key={feature}>
                    <Check className="mr-3 size-5 shrink-0" />
                    <p>{feature}</p>
                  </li>
                ))}

                {offer.limitations.length > 0 &&
                  offer.limitations.map((feature) => (
                    <li
                      className="flex items-start text-muted-foreground"
                      key={feature}
                    >
                      <X className="mr-3 size-5 shrink-0" />
                      <p>{feature}</p>
                    </li>
                  ))}
              </ul>

              {userId && subscriptionPlan ? (
                offer.title === "Starter" ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      className: "w-full",
                      variant: "default",
                    })}
                  >
                    Go to dashboard
                  </Link>
                ) : (
                  <BillingFormButton
                    year={isYearly}
                    offer={offer}
                    subscriptionPlan={subscriptionPlan}
                  />
                )
              ) : (
                <Button onClick={signInModal.onOpen}>Sign in</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-balance text-center text-base text-muted-foreground">
        Email{" "}
        <a
          className="font-medium text-primary hover:underline"
          href="mailto:support@saas-starter.com"
        >
          support@saas-starter.com
        </a>{" "}
        for to contact our support team.
        <br />
        <strong>
          You can test the subscriptions and won&apos;t be charged.
        </strong>
      </p>
    </section>
  );
}
