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
import { useState } from "react";

interface SelectProps {
  title?: string;
  list: string[];
}

export function SelectComponent({ list, title }: SelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(list[0]);

  return (
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
