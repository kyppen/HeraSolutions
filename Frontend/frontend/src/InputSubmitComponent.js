import { useState } from "react";

function InputSubmitComponent() {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        //alert(`Submitted: ${inputValue}`);
        e.preventDefault()
        const createdRute = {
            id:'',
            ruteName: ''
        };

        try{
            console.log("Add to campaign");
            const response = await fetch('http://localhost:8080/api/rute/' + inputValue, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createdRute)
            });
            if(!response.ok){
                throw new Error('Failed to create rut ')
            }
            setInputValue("");

        }catch (err){
            setError(err instanceof Error ? err.message: 'An unknown error occured');
            console.error("Error adding to rute", err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', width: '300px' }}>
            <input
                type="text"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button onClick={handleSubmit} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Submit
            </button>
        </div>
    );
}
export default InputSubmitComponent;
