import { createContext, useContext, useState } from "react";

const BuilderContext = createContext(null);

const initialSelection = {
  base: null,
  sauce: null,
  cheese: null,
  vegetables: [],
};

export function BuilderProvider({ children }) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState(initialSelection);

  const selectBase = (base) => setSelection((prev) => ({ ...prev, base }));
  const selectSauce = (sauce) => setSelection((prev) => ({ ...prev, sauce }));
  const selectCheese = (cheese) => setSelection((prev) => ({ ...prev, cheese }));

  const toggleVegetable = (veg) => {
    setSelection((prev) => {
      const alreadySelected = prev.vegetables.includes(veg);
      return {
        ...prev,
        vegetables: alreadySelected
          ? prev.vegetables.filter((v) => v !== veg)
          : [...prev.vegetables, veg],
      };
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const resetBuilder = () => {
    setSelection(initialSelection);
    setStep(1);
  };

  return (
    <BuilderContext.Provider
      value={{
        step,
        selection,
        selectBase,
        selectSauce,
        selectCheese,
        toggleVegetable,
        nextStep,
        prevStep,
        resetBuilder,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  return useContext(BuilderContext);
}