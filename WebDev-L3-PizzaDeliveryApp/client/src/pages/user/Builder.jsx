import { useNavigate } from "react-router-dom";
import { useBuilder } from "../../context/BuilderContext";
import StepIndicator from "../../components/builder/StepIndicator";
import StepBase from "./builder/StepBase";
import StepSauce from "./builder/StepSauce";
import StepCheese from "./builder/StepCheese";
import StepVegetables from "./builder/StepVegetables";
import Button from "../../components/ui/Button";

function Builder() {
  const { step, selection, nextStep, prevStep } = useBuilder();
  const navigate = useNavigate();

  const canProceed = {
    1: !!selection.base,
    2: !!selection.sauce,
    3: !!selection.cheese,
    4: true,
  }[step];

  const handleNext = () => {
    if (step === 4) {
      navigate("/order-summary");
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <StepIndicator currentStep={step} />

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 min-h-[320px]">
          {step === 1 && <StepBase />}
          {step === 2 && <StepSauce />}
          {step === 3 && <StepCheese />}
          {step === 4 && <StepVegetables />}
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            ← Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed}>
            {step === 4 ? "Review Order" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Builder;