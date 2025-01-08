'use client'

import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Images() {
    const images = [
        "/images/fuhoalac.webp",
        "/images/fuhochiminh.webp",
        "/images/fudanang.webp",
        "/images/fuquynhon.webp",
        "/images/fucantho.webp",
    ]

    return (
        <Carousel
            className="w-full h-full rounded-2xl overflow-hidden"
            plugins={[
                Autoplay({
                    delay: 3500,
                }),
            ]}
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent className="rounded-lg">
                {images.map((src, index) => (
                    <CarouselItem key={index} className="h-screen rounded-2xl">
                        <div className="relative w-full h-full rounded-2xl">
                            <Image
                                src={src}
                                alt={`Image ${index + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
                                className="object-cover rounded-2xl"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}