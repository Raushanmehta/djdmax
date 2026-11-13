import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { price } from "@/data/filter/price";
import { discount } from "@/data/filter/discount";
import { locations } from "@/data/filter/location";

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ===================================================
     GENERIC HELPERS (Reusable For All Filters)
  =================================================== */

  const getSelectedValues = useCallback(
    (key) => searchParams.get(key)?.split(",") ?? [],
    [searchParams]
  );

  const handleMultiSelect = useCallback(
    (key, value, checked) => {
      const params = new URLSearchParams(searchParams);
      let selected = getSelectedValues(key);

      if (checked === true) {
        if (!selected.includes(value)) {
          selected.push(value);
        }
      } else {
        selected = selected.filter((item) => item !== value);
      }

      if (selected.length) {
        params.set(key, selected.join(","));
      } else {
        params.delete(key);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams, getSelectedValues]
  );

  const handleSingleSelect = useCallback(
    (key, value, checked) => {
      const params = new URLSearchParams(searchParams);

      if (checked === true) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const clearAllFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  /* ===================================================
     LOCATION DERIVED STATE
  =================================================== */

  const selectedState = searchParams.get("state");

  const selectedStateData = useMemo(
    () => locations.find((loc) => loc.value === selectedState),
    [selectedState]
  );

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="space-y-2 border-r">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-sm font-semibold tracking-wide">FILTER</p>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="font-medium hover:text-orange-500"
        >
          CLEAR All
        </Button>
      </div>

      <Separator />

      <div className="px-6 pb-8 space-y-8">

        {/* Filter items here */}


        {/* ================= PRICE (Multi Select) ================= */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Price
          </h3>

          {price.map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${item.value}`}
                checked={getSelectedValues("price").includes(
                  String(item.value)
                )}
                onCheckedChange={(checked) =>
                  handleMultiSelect(
                    "price",
                    String(item.value),
                    checked
                  )
                }
              />
              <Label htmlFor={`price-${item.value}`}>
                {item.name}
              </Label>
            </div>
          ))}
        </section>

        {/* ================= DISCOUNT (Multi Select) ================= */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Discount
          </h3>

          {discount.map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <Checkbox
                id={`discount-${item.value}`}
                checked={getSelectedValues("discount").includes(
                  String(item.value)
                )}
                onCheckedChange={(checked) =>
                  handleMultiSelect(
                    "discount",
                    String(item.value),
                    checked
                  )
                }
              />
              <Label htmlFor={`discount-${item.value}`}>
                {item.name}
              </Label>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default FilterSection;