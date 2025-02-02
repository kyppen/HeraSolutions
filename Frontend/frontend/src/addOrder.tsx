import React, {useState} from "react";

interface order {
    transportFirm: string;
    sender: string; // Optional prop
    receiver: string;
    pickupTime: string;
    deliveryTime: string;
    packageCount: number;
    ruteId: number;
}

const createOrder: React.FC<Props> = ({order}) => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [transportFirm, setTransportFirm] = useState('');
    const [packageCount, setPackageCount] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [ruteId, setRuteId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            sender,
            receiver,
            transportFirm,
            packageCount,
            deliveryTime,
            ruteId,
        };
        console.log("Form Data:", formData);
    }
    return (
        <form onSubmit={handleSubmit}
              style={{display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px"}}>
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
                <input type="text" value={transportFirm} onChange={(e) => setTransportFirm(e.target.value)} required/>
            </label>

            <label>
                Package Count:
                <input type="number" value={packageCount} onChange={(e) => setPackageCount(e.target.value)} required/>
            </label>

            <label>
                Delivery Time:
                <input type="datetime-local" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}
                       required/>
            </label>

            <label>
                Rute ID:
                <input type="text" value={ruteId} onChange={(e) => setRuteId(e.target.value)} required/>
            </label>

            <button type="submit">Submit</button>
        </form>
    );
};

export default createOrder;
