import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function HeaderContent({ title, subtitle, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
