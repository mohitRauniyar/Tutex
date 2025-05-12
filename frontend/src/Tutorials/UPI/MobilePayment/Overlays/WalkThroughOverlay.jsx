import React, { useEffect, useState } from "react";
import "./WalkThroughOverlay.css";

function WalkthroughOverlay({ step, refs, onComplete }) {
  const instructions = {
    landing: [
      {
        text: "Welcome to tutorial lesson of payment through Contacts.",
        target: null,
        button: true,
      },
      {
        text: "This is the landing page you see after opening your UPI payment application.",
        target: null,
        button: true,
      },
      {
        text: "Click on To Mobile Number",
        target: "mobilecontact",
        instructionPosition: { x: 109, y: 100 },
        pulsate: true,
      },
    ],
    search: [
      {
        text: "Here you will have to search for the contact you want to send money to.",
        target: null,
        button: true,
        // instructionPosition: { x: 100, y: 300 },
      },
      {
        text: "Click on the search box.",
        target: "searchbox",
        // button: true,
        instructionPosition: { x: 0, y: 100 },
        pulsate: true,
      },
    ],
    chooseContact: [
      {
        text: "Type marie on the search box. If you something else then you won't be able to move forward",
        target: "Textbox",
        button: true,
        instructionPosition: { x: 4, y: 100 },
        pulsate: true,
      },
      {
        text: "Click on the name popping up",
        target: "searchtext",
        // button: true,
        pulsate: true,
        instructionPosition: { x: 18, y: 80 },
      },
    ],
    enterAmount: [
      {
        text: "In this step, you will enter the amount to be sent.",
        target: null,
        button: true,
      },
      {
        text: "Enter the amount in the highlighted field. For this exercise let's enter an amount of Rs. 120.",
        target: "amountInputRef",
        instructionPosition: { x:20, y: -400 },
        // button: true
      },
      {
        text: "Click on green send button.",
        target: "sendButtonRef",
        instructionPosition: { x: -100, y: -400 },
        pulsate:true,
      },
    ],
    enterPin: [
      {
        text: "In this step, you will enter your secret UPI-PIN.",
        target: null,
        button: true,
      },
      {
        text: "For this exercise, we have set the secret pin to 0000. Enter the pin 0000 using the keyboard then press the check button on the keyboard.",
        target: null,
        button: true,
      },
    ],
  };

  // State to track current step and highlight position
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState(null);
  const [showHighlight, setShowHighlight] = useState(false);

  // Get target element position for the highlight
  const getHighlightPosition = () => {
    const targetRef = refs[instructions[step][currentStep]?.target];
    if (!targetRef?.current) return null;
    const rect = targetRef.current.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    };
  };

  // Update highlight position dynamically
  useEffect(() => {
    const updateHighlightPosition = () => {
      setHighlightPosition(getHighlightPosition());
    };

    updateHighlightPosition();

    // Listen for scroll and resize
    window.addEventListener("resize", updateHighlightPosition);
    window.addEventListener("scroll", updateHighlightPosition);

    return () => {
      window.removeEventListener("resize", updateHighlightPosition);
      window.removeEventListener("scroll", updateHighlightPosition);
    };
  }, [currentStep, step]);

  // Add pulsate animation if needed
  useEffect(() => {
    const currentInstruction = instructions[step][currentStep];
    const targetRef = refs[currentInstruction?.target];

    if (targetRef?.current && currentInstruction?.pulsate === true) {
      targetRef.current.classList.add("pulsate");
      targetRef.current.style.zIndex = 9999;
      targetRef.current.style.position = "relative";
      targetRef.current.style.pointerEvents = "auto";
    }

    setShowHighlight(currentInstruction?.target !== null);

    // Clean up on step change
    return () => {
      if (targetRef?.current) {
        targetRef.current.classList.remove("pulsate");
        targetRef.current.style.zIndex = "";
        targetRef.current.style.position = "";
        targetRef.current.style.pointerEvents = "";
      }
    };
  }, [currentStep, step]);

  // Handle amount input
  useEffect(() => {
    const targetRef = refs["amountInputRef"];
    if (targetRef?.current) {
      const handleInputChange = (e) => {
        if (
          e.target.value === "120" &&
          instructions[step][currentStep]?.target === "amountInputRef"
        ) {
          delayedHandleNext();
        }
      };

      targetRef.current.addEventListener("input", handleInputChange);

      return () => {
        // targetRef.current.removeEventListener("input", handleInputChange);
      };
    }
  }, [currentStep, step]);

  const delayedHandleNext = () => {
    setTimeout(() => {
      handleNext();
    }, 300); // 200ms delay to allow DOM update
  };

  // Detect 'Proceed to Pay' button click and go to the next step
  useEffect(() => {
    const targetRef = refs["proceedRef"];
    if (
      targetRef?.current &&
      instructions[step][currentStep]?.target === "proceedRef"
    ) {
      const handleProceedClick = () => {
        delayedHandleNext(); // Go to the next step
      };

      targetRef.current.addEventListener("click", handleProceedClick);

      return () => {
        // targetRef.current.removeEventListener("click", handleProceedClick);
      };
    }
  }, [currentStep, step]);

  // Move to the next step
  const handleNext = () => {
    if(step === "chooseContact"){
      const input = refs["Textbox"].current.value.toLowerCase();
      console.log(input)
      console.log(refs["searchtext"].current)
      if(input === "marie")setCurrentStep((prev) => prev + 1);
    }
    else if (currentStep < instructions[step].length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(); // End the walkthrough
    }
  };

  if (currentStep >= instructions[step].length) return null;
  const currentInstruction = instructions[step][currentStep];

  // Dynamically calculate instruction box position
  const instructionBoxStyle = {
    top:
      currentInstruction?.instructionPosition?.y !== undefined
        ? highlightPosition?.top +
          highlightPosition?.height +
          currentInstruction.instructionPosition.y
        : highlightPosition
        ? Math.min(
            window.innerHeight - 200,
            Math.max(20, highlightPosition.top + highlightPosition.height + 10)
          )
        : "50%",
    left:
      currentInstruction?.instructionPosition?.x !== undefined
        ? highlightPosition?.left +
          highlightPosition?.width / 2 +
          currentInstruction.instructionPosition.x
        : highlightPosition
        ? Math.min(
            window.innerWidth - 200,
            Math.max(20, highlightPosition.left + highlightPosition.width / 2)
          )
        : "50%",
    transform: highlightPosition ? "translateX(-50%)" : "translate(-50%, -50%)",
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[10000] pointer-events-none">
      {/* Dim Background with Cutout */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#000000dd] pointer-events-none"
        style={{
          clipPath: showHighlight
            ? `polygon(
                0% 0%,
                0% 100%,
                ${highlightPosition.left}px 100%,
                ${highlightPosition.left}px ${highlightPosition.top}px,
                ${highlightPosition.left + highlightPosition.width}px ${
                highlightPosition.top
              }px,
                ${highlightPosition.left + highlightPosition.width}px ${
                highlightPosition.top + highlightPosition.height
              }px,
                ${highlightPosition.left}px ${
                highlightPosition.top + highlightPosition.height
              }px,
                ${highlightPosition.left}px 100%,
                100% 100%,
                100% 0%
              )`
            : "none",
        }}
      />

      {/* Instruction Box */}
      <div
        className="fixed p-8 bg-[#6510C5] text-white rounded-lg shadow-lg max-w-md w-full text-center z-[10001] pointer-events-auto"
        style={instructionBoxStyle}
      >
        <p className="mb-4">{currentInstruction?.text}</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">
            Step {currentStep + 1} of {instructions[step].length}
          </span>

          {currentInstruction?.button && (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-white text-black"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalkthroughOverlay;
