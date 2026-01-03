"use client";

import { useQuery } from "convex/react";
import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { api } from "../convex/_generated/api";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const tasks = useQuery(api.tasks.get);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <AuthForm />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {session.user.name}</span>
          <Button onClick={() => authClient.signOut()}>Sign Out</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-md">
        {tasks?.map(({ _id, text }) => (
          <div key={_id} className="p-4 border rounded shadow-sm">
            {text}
          </div>
        ))}
        {tasks?.length === 0 && (
          <div className="text-gray-500 text-center">No tasks yet</div>
        )}
      </div>
    </main>
  );
}
