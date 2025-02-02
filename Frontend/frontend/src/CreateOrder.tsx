import React, {useState} from "react";

interface ruteIdProp{
    id: number;
}

const CreateOrder: React.FC<ruteIdProp> = ({id}) => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [transportFirm, setTransportFirm] = useState('');
    const [packageCount, setPackageCount] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [ruteId, setRuteId] = useState(id);

    const createOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        const newOrder = {
            transportFirm,
            sender,
            receiver,
            pickupTime,
            deliveryTime,
            packageCount,
            ruteId,
        }
        try {
            const response = await fetch('http://localhost:8080/api/add-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
        } catch (err) {
            console.error('Error creating order:', err);
        }
        window.location.reload();
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form
                onSubmit={createOrder}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    padding: "20px",
                    width: "300px",
                    textAlign: "center",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <label>
                    Sender:
                    <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} required/>
                </label>

                <label>
                    Receiver:
                    <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} required/>
                </label>

                <label>
                    Transport Firm:
                    <input type="text" value={transportFirm} onChange={(e) => setTransportFirm(e.target.value)}
                           required/>
                </label>

                <label>
                    Package Count:
                    <input type="number" value={packageCount} onChange={(e) => setPackageCount(e.target.value)}
                           required/>
                </label>

                <label>
                    Delivery Time:
                    <input type="date" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}
                           required/>
                </label>
                <label>
                    Pickup Time:
                    <input type="date" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}
                           required/>
                </label>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateOrder;
