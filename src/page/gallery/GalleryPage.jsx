import PageTopSection from "@/components/common/PageTopSection";
import React from "react";
import GallerySection from "./GallerySection";

export default function GalleryPage() {
  return (
    <main>
      <PageTopSection title="Gallery" />
      <GallerySection />
    </main>
  );
}
