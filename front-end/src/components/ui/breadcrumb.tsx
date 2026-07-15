import ChevronRight from "../../assets/icons/chevron-right.svg?react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  paths: { label: string; to?: string }[];
}

export function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-cinza-escuro mb-4">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          {path.to ? (
            <Link
              to={path.to}
              className="hover:text-azul-interativo transition-colors"
            >
              {path.label}
            </Link>
          ) : (
            <span className="font-semibold text-azul-marinho">
              {path.label}
            </span>
          )}
          {index < paths.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-cinza-medio" />
          )}
        </div>
      ))}
    </nav>
  );
}
