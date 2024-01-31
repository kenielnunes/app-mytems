import { ProfileForm } from "@/components/form/profile-form";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { Separator } from "@radix-ui/react-menubar";
import React from "react";

export default function Profile() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </SettingsLayout>
  );
}
