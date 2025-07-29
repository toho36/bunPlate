import { Mail } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We've sent you a magic link to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            Click the link in the email to sign in. The link will expire in 24 hours.
          </p>
          <p className="mt-4">
            Don't see the email? Check your spam folder or{" "}
            <a
              href="/auth/signin"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              try signing in again
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}