"use client";
import Link from "next/link";
import Image from "next/image";
import profilepic from "public/images/profile-photo-640x640.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Plus, LogOut, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  imgUrl: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  role: string | null | undefined;
};
export default function MobileNav({ imgUrl, name, email, role }: Props) {
  const route = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Replace '/' with your desired redirect URL
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={imgUrl || ""} alt="profile" />
            <AvatarFallback>{name ? name.slice(0, 2) : ""}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => route.push(`/authers/${email}`)}>
            <User className="w-4 h-4 mr-2" />
            <span>{name}</span>
          </DropdownMenuItem>
          {role == "admin" && (
            <DropdownMenuItem onClick={() => route.push(`/admin`)}>
              <Edit className="w-4 h-4 mr-2" />
              <span>Admin Page</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => route.push(`/create-post`)}>
            <Plus className="w-4 h-4 mr-2" />
            <span>Create a post</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
