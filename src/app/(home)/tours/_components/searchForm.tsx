"use client";

import { Input } from "@/components/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchForm({ placeholder, className }: { placeholder?: string, className?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, 300);
  const navigate = useDebouncedCallback((value: string) => {
    if (pathname === '/')
      router.replace(`/tours`);
  }, 200)

  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      onFocus={(e) => navigate(e.target.value)}
      defaultValue={searchParams.get("q") || ""}
      type="text"
      placeholder={placeholder ?? "Search..."}
      id="search"
      name="search"
      className={`md:w-2/3 mx-auto placeholder:px-2 placeholder:text-white font-medium w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:px-2  focus:border-black text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out ${className}`}
    />
  );
}
