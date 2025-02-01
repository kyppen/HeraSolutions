import { useEffect, useState } from "react";

const DragDropList = ({ items }) => {
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        setListItems(items);
    }, [items]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("index", index);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData("index");
        const newItems = [...listItems];
        const [draggedItem] = newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);
        setListItems(newItems);
    };

    return (
        <div style={{ padding: 20, display: "flex", gap: 10, background: "#f8f8f8", minHeight: 100, overflowX: "auto", width: "100%" }}>
            {listItems.length > 0 ? (
                listItems.map((item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, index)}
                        style={{
                            padding: 10,
                            width: 250,
                            background: "blueviolet",
                            borderRadius: 5,
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            cursor: "grab",
                            display: "inline-block",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <strong>{item.transportFirm}</strong>
                        <p>ID: {item.id}</p>
                        <p>Receiver: {item.receiver}</p>
                        <p>Pickup Time: {item.pickupTime}</p>
                        <p>Delivery Time: {item.deliveryTime}</p>
                        <p>Package Count: {item.packageCount}</p>
                        <p>Route ID: {item.ruteId}</p>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
};

export default function RuteList() {
    const [rutes, setRutes] = useState([]);
    const [selectedRute, setSelectedRute] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/rutes")
            .then((response) => response.json())
            .then((data) => setRutes(data))
            .catch((error) => console.error("Error fetching rutes:", error));
    }, []);

    const handleRuteClick = (rute) => {
        console.log(`Loading orders for route: ${rute.ruteName}`);
        setSelectedRute(rute);
        setLoadingOrders(true);
        fetch(`http://localhost:8080/api/${rute.id}/orders`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched orders:", data);
                setOrders(data);
                setLoadingOrders(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoadingOrders(false);
            });
    };

    return (
        <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <h1>Available Routes</h1>
            <div>
                {rutes.map((rute) => (
                    <div key={rute.Id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "5px", cursor: "pointer" }} onClick={() => handleRuteClick(rute)}>
                        {rute.ruteName}
                    </div>
                ))}
            </div>

            {selectedRute && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", width: "100%" }}>
                    <h2>Route Details</h2>
                    <p><strong>ID:</strong> {selectedRute.Id}</p>
                    <p><strong>Name:</strong> {selectedRute.ruteName}</p>
                    <p><strong>Description:</strong> {selectedRute.description || "No description available."}</p>
                    <button onClick={() => setSelectedRute(null)}>Close</button>
                    {loadingOrders ? <p>Loading orders...</p> : <DragDropList items={orders} />}
                </div>
            )}
        </div>
    );
}
