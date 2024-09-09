"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const {user} = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({title: "Untitled"})
      .then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* <Image 
        src="/placeholder.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image 
        src="/placeholder.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      /> */}
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName || user?.username}&apos;s Potion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}
 
export default DocumentPage;