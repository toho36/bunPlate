import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { SignInForm } from "@/components/auth/signin-form";

interface SignInPageProps {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerSession(authOptions);

  // If user is already signed in, redirect to callback URL or home
  if (session) {
    redirect(searchParams.callbackUrl || "/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account to continue
          </p>
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm callbackUrl={searchParams.callbackUrl} />
        </Suspense>

        {searchParams.error && (
          <div className="bg-destructive/15 text-destructive text-sm rounded-md p-3 text-center">
            {searchParams.error === "OAuthSignin" && "Error occurred during OAuth sign in."}
            {searchParams.error === "OAuthCallback" && "Error occurred during OAuth callback."}
            {searchParams.error === "OAuthCreateAccount" && "Could not create OAuth account."}
            {searchParams.error === "EmailCreateAccount" && "Could not create email account."}
            {searchParams.error === "Callback" && "Error occurred during callback."}
            {searchParams.error === "OAuthAccountNotLinked" && 
              "OAuth account is not linked. Please sign in with the same method you used before."}
            {searchParams.error === "EmailSignin" && "Check your email for the sign in link."}
            {searchParams.error === "CredentialsSignin" && "Invalid credentials."}
            {searchParams.error === "SessionRequired" && "Please sign in to access this page."}
            {!["OAuthSignin", "OAuthCallback", "OAuthCreateAccount", "EmailCreateAccount", 
               "Callback", "OAuthAccountNotLinked", "EmailSignin", "CredentialsSignin", 
               "SessionRequired"].includes(searchParams.error) && 
              "An error occurred. Please try again."}
          </div>
        )}
      </div>
    </div>
  );
}