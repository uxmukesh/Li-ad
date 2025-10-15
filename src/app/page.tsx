"use client";

import { useState } from "react";
import Header from "@/components/Header";
import AdGenerator from "@/components/AdGenerator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header />
      <AdGenerator />
      <Footer />
    </div>
  );
}
