import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CHARACTERISTICS = ["Aktif", "Ramah", "Cerdas", "Tenang", "Setia", "Lincah"]

interface BreedFiltersProps {
  selectedTraits: string[]
  onTraitChange: (trait: string) => void
}

export function BreedFilters({ selectedTraits, onTraitChange }: BreedFiltersProps) {
  return (
    <div className="space-y-8 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Karakteristik</h4>
        <div className="flex flex-col gap-4">
          {CHARACTERISTICS.map((trait) => (
            <div key={trait} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox 
                id={trait} 
                checked={selectedTraits.includes(trait)}
                onCheckedChange={() => onTraitChange(trait)}
                className="rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
              <Label htmlFor={trait} className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors cursor-pointer italic">
                {trait}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}