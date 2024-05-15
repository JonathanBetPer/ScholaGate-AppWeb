import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import "../styles/LogInButton.css";

function App({ onClick, buttonText, isProcessing }) {
  const [localButtonText, setLocalButtonText] = useState(buttonText);
  const [localIsProcessing, setLocalIsProcessing] = useState(isProcessing);

  useEffect(() => {
    setLocalButtonText(buttonText);
    setLocalIsProcessing(isProcessing);
  }, [buttonText, isProcessing]);

  const handleClick = () => {
    onClick && onClick(); // Llama a la función onClick que pasaste como prop
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="md"
        isProcessing={localIsProcessing}
        className="gradient-button"
        onClick={handleClick}
      >
        {localButtonText}
      </Button>
    </div>
  );
}
export default App;
