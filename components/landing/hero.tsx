"use client";

import { MoveRight } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => (
  <div className="relative w-full py-20 lg:py-40 overflow-hidden">
   

    <div className="container mx-auto relative">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              AVL Tree Visualizer
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              Interactive tool for visualizing AVL Tree. 
            </p>
          </div>
          <div className="flex flex-row gap-4">
            
            <Link href="/visualizer/avl-tree">
              <RainbowButton className="w-full">
                Visualizer <MoveRight className="hidden sm:block w-4 h-4" />
              </RainbowButton>
            </Link>
          </div>
        </div>
  
  <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-400 to-orange-800 p-2">
  <div className="relative aspect-video rounded-lg overflow-hidden border border-orange-700">
    <Image
      src="/ds-avl.png"
      alt="Visualizer Preview"
      fill
      className="object-cover"
      priority
    />
  </div>
  
</div>

      </div>
    </div>
  </div>
); 