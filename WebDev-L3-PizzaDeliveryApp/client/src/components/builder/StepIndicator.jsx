function StepIndicator({ currentStep }) {
  const steps = ["Base", "Sauce", "Cheese", "Veggies"];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;

        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm
                  ${isActive ? "bg-brand text-white" : ""}
                  ${isComplete ? "bg-success text-white" : ""}
                  ${!isActive && !isComplete ? "bg-muted/20 text-muted" : ""}
                `}
              >
                {isComplete ? "✓" : stepNumber}
              </div>
              <span className="text-xs mt-1 text-muted hidden sm:block">{label}</span>
            </div>
            {stepNumber < steps.length && (
              <div className={`w-6 sm:w-12 h-0.5 ${isComplete ? "bg-success" : "bg-muted/20"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;