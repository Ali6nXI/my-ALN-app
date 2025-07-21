import { useState } from "react";
import abi from "./abi.json";
import { ethers } from "ethers";

const contractAddress = "0xc8299060Dde807E8947EFe1E1CA2910973251380";

function App() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const handleget = async () => {
    try {
      

      if (window.ethereum) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const message = await contract.getMessage(); 
        setMessage(message)
      } else {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error setting message:", error);
      alert(error.message || error);
    }
  };
  const handleSet = async () => {
    try {
      if (!text) {
        alert("Please enter a message before setting.");
        return;
      }

      if (window.ethereum) {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.setMessage(text); 
        const txReceipt = await tx.wait();
        console.log("Transaction successful:", txReceipt);
      } else {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error setting message:", error);
      alert(error.message || error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Set Message on Smart Contract</h1>
      <input
        type="text"
        placeholder="Set message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSet}>Set Message</button>
      <button onClick={handleget}>Get Message</button>
      <p>{message}</p>
    </div>
  );
}

export default App;