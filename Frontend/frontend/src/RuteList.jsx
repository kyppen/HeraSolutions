import { useEffect, useState } from "react";
import CreateOrder from "./CreateOrder";

const DragDropList = ({ items, setOrders }) => {
    const [listItems, setListItems] = useState(items);
    useEffect(() => {
        setListItems(items);
    }, [items]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("index", index);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData("index");
        if (dragIndex === dropIndex) return;
        const newItems = [...listItems];

        const [draggedItem] = newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);
        const reorderedItems = newItems.map((item, i) => ({ ...item, index: i }));

        setListItems(reorderedItems);
        setOrders(reorderedItems);
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
                            width: 1000,
                            background: "blueviolet",
                            borderRadius: 5,
                            fontSize: 10,
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            cursor: "grab",
                            display: "inline-block",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <strong>{item.transportFirm}</strong>
                        <p>ID: {item.id}</p>
                        <p>Index: {item.index}</p>
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

function RuteList() {
    const [rutes, setRutes] = useState([]);
    const [selectedRute, setSelectedRute] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
                const sortedOrders = data.sort((a, b) => a.index - b.index);
                setOrders(sortedOrders);
                setLoadingOrders(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoadingOrders(false);
            });
    };
    const saveOrderByDeliveryTime = async () => {
        if (!selectedRute) {
            console.error("No route selected!");
            return;
        }
        fetch(`http://localhost:8080/api/sortbydelivery/` + selectedRute.id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched orders:", data);
                const sortedOrders = data.sort((a, b) => a.index - b.index);
                setOrders(sortedOrders);
                setLoadingOrders(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoadingOrders(false);
            });
    }
    const saveOrderByPickupDate = async () => {
        if (!selectedRute) {
            console.error("No route selected!");
            return;
        }
        fetch(`http://localhost:8080/api/sortbypickup/` + selectedRute.id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched orders:", data);
                const sortedOrders = data.sort((a, b) => a.index - b.index);
                setOrders(sortedOrders);
                setLoadingOrders(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoadingOrders(false);
            });
    }

    //Instead of doing a loop this should do a batch update.
    const saveNewOrderOrder = async () => {
        if (!selectedRute) {
            console.error("No route selected!");
            return;
        }

        console.log("Saving orders with updated index:");
        const updatedOrders = orders.map((order, index) => ({ ...order, index }));

        console.log("Saving orders with updated index:", updatedOrders);
        for(let i = 0; i < updatedOrders.length; i++) { //
            console.log("LOOP UPDATING EACH");
            try {
                const response = await fetch('http://localhost:8080/api/update-order', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrders[i]),
                });
                if (!response.ok) {
                    throw new Error('Failed to create order');
                }
            } catch (err) {
                console.log("ERROR");
            }
        }
    }

    return (
        <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <h1>Available Routes</h1>
            <div>
                {rutes.map((rute) => (
                    <div key={rute.id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "5px", cursor: "pointer" }} onClick={() => handleRuteClick(rute)}>
                        {rute.ruteName}
                    </div>
                ))}
            </div>

            {selectedRute && (
                <div style={{marginTop: "20px", padding: "10px", border: "1px solid #ccc", width: "100%"}}>
                    <h2>Route Details</h2>
                    <p><strong>ID:</strong> {selectedRute.id}</p>
                    <p><strong>Name:</strong> {selectedRute.ruteName}</p>
                    <button onClick={() => setSelectedRute(null)}>Close</button>
                    <button
                        onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Hide Form" : "Create New Order"}
                    </button>

                    {showForm && <CreateOrder id={selectedRute.id}/>}
                    <p>Orders</p>
                    {loadingOrders ? (
                        <p>Loading orders...</p>
                    ) : (
                        <DragDropList items={orders} setOrders={setOrders}/>
                    )}
                    <button onClick={saveNewOrderOrder}>Save in this order</button>
                    <button onClick={saveOrderByDeliveryTime}>Sort orders by delivery date</button>
                    <button onClick={saveOrderByPickupDate}>Sort orders by pickup date</button>
                </div>
            )}
        </div>
    );
}
export default RuteList;
