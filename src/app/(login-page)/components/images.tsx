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
            className="w-full h-full"
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
            <CarouselContent>
                {images.map((src, index) => (
                    <CarouselItem key={index} className="h-screen">
                        <div className="relative w-full h-full">
                            <Image
                                src={src}
                                alt={`Image ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}