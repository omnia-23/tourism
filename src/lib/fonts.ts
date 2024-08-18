import {
  Inter as FontSans,
  Playfair_Display,
  Lato,
  Yesteryear,
  Lora,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--playfair-display",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--lato",
});
export const yesteryear = Yesteryear({
  subsets: ["latin"],
  weight: "400",
  variable: "--yesteryear",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: "400",
  variable: "--lora",
});
