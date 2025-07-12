"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { HackathonCard } from "./HackathonCard"; // We'll create this next
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  theme: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  participants: number;
  prizes: string[];
  skills: string[];
  startsIn: string;
  status: 'upcoming' | 'active' | 'completed';
}

interface HackathonCarouselProps {
  hackathons: Hackathon[];
}

export const HackathonCarousel: React.FC<HackathonCarouselProps> = ({ hackathons }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": { perView: 2 },
      "(min-width: 1024px)": { perView: 3 },
    },
  });

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="keen-slider__slide">
            <HackathonCard hackathon={hackathon} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-background/80 rounded-full p-2 shadow hover:bg-background transition"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-background/80 rounded-full p-2 shadow hover:bg-background transition"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
