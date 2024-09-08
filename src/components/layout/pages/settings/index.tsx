import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/form/settings/profile";
import { BiographyForm } from "@/components/form/settings/biography";
import { AccountForm } from "@/components/form/settings/account";
import { ProfileImageForm } from "@/components/form/settings/profile-image";

export function Settings() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
                <CardDescription>Update your profile image.</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileImageForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Edit your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
                <CardDescription>
                  A brief description about you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BiographyForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Information related to your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
