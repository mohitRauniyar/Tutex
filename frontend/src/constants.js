import { Divide } from "lucide-react";

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
  "UPI_Mobile_landing":{
    text: "Click on the To mobile Number icon right below the Money Transfer",
    ref:["mobilecontact"]
  },
  "UPI_Mobile_Searchbox":{
    text: "Click on the search box.",
    ref:["searchbox"],
  },
  "UPI_Mobile_TypeMarie":{
    text:"Type marie on the search box first and then click on the box where Marie's contact is popping up.",
    ref:["Textbox"],
  },
  "UPI_Mobile_EnterAmount":{
    text:"Click on the chatbox to enter an amount of your choice and then click on green send button at the right corner.",
    ref:["amountInputRef"],
  },
  "UPI_Mobile_EnterPin":{
    text: "Enter pin 0000 using the keyboard to send an amount.",
    ref:[],
  },
  "Bank_Pay_landing":{
    text:"Click on the bank icon present at the middle of the screen.",
    ref:[]
  },
  "Bank_Choose_Option":{
    text:"Select 'To Account Number & IFSC' in second option",
    ref:[]
  },
  "Bank_Add_Button":{
    text:"Click on 'Add Beneficiary Account' button.",
    ref:[]
  },
  "Select_Bank_Step":{
    text:"Search the name of receiver's bank or select from the given options.",
    ref:[]
  },
  "Fill_Account_Details":{
    text:"Here, you need to fill the account number and IFSC code of receiver's bank. For practice purpose, Assume receiver's account number = '123456789' and IFSC code = 'ABCD0000'. After entering correctly receiver's name: XYZ will be displayed.",
    ref:[]
  },
  "Enter_Amount_Value":{
    text:"Here, you need the enter the amount you want to send to the receiver's bank account.",
    ref:[]
  },
  "Enter_Pin_Value":{
    text:"Here, you need to give your pin. For practice, assume pin = '0000'",
    ref:[]
  }

};

export const URL_MAPS = {
  1: "UPI",
  2: "UPI/Mobile",
  3: "UPI/Bank"
}

export const INSTRUCTIONS = {
  1: {
    title: "UPI payments via QR Scan",
    instructionText:`<div class="flex flex-col gap-4 text-xl">
              <h1>Send the following amount to the receiver using the QR code scanning method using the pin given below.</h1>
              <ul class="list-disc ml-8">
                <li><h1><strong>Amount: </strong>Rs. 120</h1></li>
                <li><h1><strong>Your Pin: </strong> 0000</h1></li>
              </ul>
              <h2><i>Click on the start button to start practicing.</i></h2>
            </div>`
  },
  2: {},
  3: {}
}