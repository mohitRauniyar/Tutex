export const MODES = {
    WALKTHROUGH: "walkthrough",
    PRACTICE: "practice",
    ASSESSMENT: "assessment",
};

export const UPI_QR_INSTRUCTIONS = {
  landing: [
    {
      text: "Welcome to tutorial lesson for payment via QR code scanning.",
      target: null,
      button: true,
    },
    {
      text: "This is the landing page you see after opening your UPI payment application.",
      target: null,
      button: true,
    },
    {
      text: "Tap the QR icon to scan a QR code.",
      target: "qrScanRef",
      instructionPosition: { x: 0, y: -700 },
      pulsate: true,
    },
  ],
  qrScanning: [
    {
      text: "Here you will have to scan the QR code of the receiver using your phone camera.",
      target: "scanningArea",
      button: true,
      instructionPosition: { x: 0, y: 100 },
    },
    {
      text: "This is what a QR code looks like.",
      target: "qrCodeRef",
      button: true,
      instructionPosition: { x: 0, y: -600 },
    },
    {
      text: "Or you can upload a QR code from your gallery.",
      target: "uploadQRRef",
      button: true,
      instructionPosition: { x: 40, y: -300 },
    },
    {
      text: "Drag this QR code into the scanning area.",
      target: "qrCodeRef",
      button: true,
      instructionPosition: { x: 0, y: -600 },
    },
  ],
  enterAmount: [
    {
      text: "In this step, you will enter the amount to be sent.",
      target: null,
      button: true,
    },
    {
      text: "Enter the amount in this field. For this exercise let's enter an amount of Rs. 120.",
      target: "amountInputRef",
      instructionPosition: { x: 0, y: 200 },
    },
    {
      text: "Click on proceed to pay to go to the next step.",
      target: "proceedRef",
      instructionPosition: { x: 0, y: -400 },
    },
    {
      text: "This is a summary of your choices, if everything looks good, you can now proceed to pay the amount.",
      target: "summaryRef",
      button: true,
      instructionPosition: { x: 0, y: -600 },
    },
    {
      text: "Click on Pay button.",
      target: "payRef",
      instructionPosition: { x: 0, y: -600 },
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

export const HINTS = {
  "UPI_QR_landing": {
    text: "Click on the Scan QR code button at the bottom of the screen.",
    ref: ["qrScanRef"]
  },
  "UPI_QR_qrScanning":{
    text : "Drag the QR code at the bottom into the scanning area.",
    ref: ["qrCodeRef", "scanningArea"]
  },
  "UPI_QR_enterAmount":{
    text: "Enter the amount and click on 'Proceed to Pay' button.",
    ref: ["amountInputRef", "proceedRef"]
  },
  "UPI_QR_enterPin":{
    text: "Enter the pin as '0000' using the keyboard.",
    ref: []
  },

};
