import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useUISectionProducts } from "@/store/useUISectionProducts";

interface SelectProps {
  title?: string;
  list: string[];
}

export function SelectComponent({ list, title }: SelectProps) {
  const { handleCategoryChange, categorySelected } = useUISectionProducts();

  return (
    <Select value={categorySelected} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-45">
        <Filter className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {title && <SelectLabel>{title}</SelectLabel>}
          {list.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
