import { useEffect } from "react";
import { usePokemonStore } from "@lib/usePokemonStore";

import { formatStatName } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";

const PokemonFilterAbilities = () => {
    const {
        pokemonAbilities,
        setFilter,
        filters
    } = usePokemonStore();

    return (
        <div>
            <label className="block font-semibold mb-3 text-sm text-[#000]">
                Abilities
            </label>

            <Select
                value={filters.ability ?? "all"}
                onValueChange={(value) => {
                    if (value === "all") {
                        setFilter("ability", null);
                    } else {
                        setFilter("ability", value);
                    }
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Abilities" />
                </SelectTrigger>

                <SelectContent className="max-h-48 overflow-y-auto">
                    <SelectItem value="all">All</SelectItem>

                    {pokemonAbilities.map((item: string) => (
                        <SelectItem key={item} value={item}>
                            {formatStatName(item)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default PokemonFilterAbilities;
