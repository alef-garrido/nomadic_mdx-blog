"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Input, Card } from "@heroui/react";
import { AlertCircle, Lock } from "lucide-react";
import { toast } from "@/lib/toast";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("admin@nomadic.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const errorMsg = "Invalid email or password";
        setError(errorMsg);
        toast.error(errorMsg);
      } else if (result?.ok) {
        toast.success("Login successful! Redirecting...");
        router.push(callbackUrl);
      }
    } catch {
      const errorMsg = "An error occurred. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-slate-800 border border-slate-700">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Lock className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2 text-white">
          Admin Login
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Enter your credentials to access the admin dashboard
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nomadic.com"
              disabled={isLoading}
              className="bg-slate-700 border-slate-600"
              size="lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              className="bg-slate-700 border-slate-600"
              size="lg"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            color="primary"
            size="lg"
            className="mt-6"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-3 bg-slate-700/50 rounded-lg">
          <p className="text-xs text-slate-400 text-center">
            Demo credentials available in .env.local
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>}>
      <LoginContent />
    </Suspense>
  );
}
