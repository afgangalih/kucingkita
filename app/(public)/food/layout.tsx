import { ReactNode } from "react";

interface FoodLayoutProps {
  children: ReactNode;
}

export default function FoodLayout({ children }: FoodLayoutProps) {
  return (
    <div className="bg-white">
      {children}
    </div>
  );
}