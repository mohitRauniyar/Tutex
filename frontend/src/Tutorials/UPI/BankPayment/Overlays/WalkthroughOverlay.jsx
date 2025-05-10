import React, { useEffect, useState } from "react";
import "./WalkThroughOverlay.css"
import EnterAmount from "../EnterAmount";

function WalkthroughOverlay({ step, refs, onComplete,reload }) {
  const instructions = {
    landing: [
      {
        text: "Welcome to tutorial lesson for payment via Bank Account number.",
        target: null,
        button: true,
      },
      {
        text: "This is the landing page you see after opening your UPI payment application.",
        target: null,
        button: true,
      },
      {
        text: "Tap the Bank icon to choose receiver's bank.",
        target: "BankButtonRef",
        instructionPosition: { x: -12, y: 300 },
        pulsate: true,
      },
    ],
    chooseService:[
      {
        text:"Here you have to choose whether send money to your account or other's account",
        target:null,
        button:true,
      },
      {
        text:"Tap on 'To Other's bank account'",
        target:"chooseOption",
        instructionPosition:{x:-20,y:20},
        pulsate:true
      }
    ],
    AddAccount:[
      {
        text:"Here you will have to add account to whom you want to send money",
        target:null,
        button:true,
      },
      {
        text:"Click on `Add Beneficiary Account` Button",
        target:"AddAccount",
        pulsate:true,
        instructionPosition:{x:0,y:-250},
      }
    ],
    selectBank:[
      {
        text:"Now you will have to select the receiver bank.",
        target:null,
        button:true,
      },{
        text:"Type 'DhanLaxmi Bank' in search bar. Your searched bank will appear just below the search bar if it exist!",
        target:"searchRef",
        instructionPosition:{x:0,y:250},
        button:true
      },{
        text:"Click on DhanLaxmi Bank",
        target:"bankRef",
        instructionPosition:{x:0,y:250},
      }
    ],
    AddBankDetails:[
      {
        text:"Enter correct receiver Account Number: 123456789. Enter correct receiver IFSC code: DLXB0000",
        target:"inputRef",
        button:true,
        instructionPosition:{x:0,y:50}
      },
      {
        text:"Now you can see the account holder name to whom you are sending the money. You can verify the name of account holder.",
        button:true,
        target:"accountHolder",
        instructionPosition:{x:0,y:5}
      },
      {
        text:"Click on 'PROCEED TO PAY' button",
        target:"buttonRef",
        pulsate:true,
        instructionPosition:{x:0,y:-200}
      },
      {
        text:"Please Enter correct receiver Account Number and correct IFSC code.",
        target:null,
        button:true
      },
    ],
    EnterAmount:[
      {
        text:"In this page, you will have to enter the amount you want to send to the receiver. you can verify the details of receiver from here.",
        target:"headRef",
        button:true,
        instructionPosition:{x:0,y:250}
      },
      {
        text:"Here, you need to enter the amount. For practice purpose, enter 120 and click the green send button:",
        target:"inputRef",
        instructionPosition:{x:0,y:-500}
      }
    ],
    EnterPin: [
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
      top: rect.top + window.scrollY -10,
      left: rect.left + window.scrollX - 10,
      width: rect.width + 20,
      height: rect.height + 20,
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


  const delayedHandleNext = () => {
    setTimeout(() => {
      handleNext();
    }, 300); // 200ms delay to allow DOM update
  };
  

  // Move to the next step
  const handleNext = () => {
    if(step === "AddBankDetails"){
      if(currentStep === 1)return setCurrentStep(2);
      if(currentStep === 2)return onComplete();
      else if(currentStep === 3){
        return setCurrentStep(0);
      }
      const [inputTag1,inputTag2] = refs["inputRef"].current.children;
      if(inputTag1.value === "123456789" && inputTag2.value === "DLXB0000"){
        setCurrentStep(1);
      }else{
        setCurrentStep(3);
      }

    }else if(step == "selectBank"){
      if(currentStep === 1){
        const bankName = refs["searchRef"].current.value.toLowerCase();
        if("Dhanlaxmi Bank".toLowerCase() === bankName)setCurrentStep(2);
      }else{
        setCurrentStep((prev)=>prev+1);
      }
      
    }else{
      if (currentStep < instructions[step].length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        onComplete(); // End the walkthrough
      }
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
        className="absolute top-0 left-0 w-full h-full bg-[#000000dd] pointer-events-auto"
        style={{
          clipPath: showHighlight
            ? `polygon(
                0% 0%,
                0% 100%,
                ${highlightPosition.left}px 100%,
                ${highlightPosition.left}px ${highlightPosition.top}px,
                ${highlightPosition.left + highlightPosition.width}px ${highlightPosition.top}px,
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
        className="fixed p-8 bg-[#6510C5] text-white rounded-lg shadow-lg w-full text-center z-[10001] pointer-events-auto"
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
