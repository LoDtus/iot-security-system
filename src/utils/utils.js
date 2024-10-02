

export const connectDevice = async (deviceBLE, characteristicBLE, value, firebaseFunction) => {
    try {
        console.log("Requesting Bluetooth Device...");
        deviceBLE = await navigator.bluetooth.requestDevice({
            filters: [{ name: "Security System" }],
            optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"],
        });

        console.log("Connecting to GATT Server...");
        const server = await deviceBLE.gatt.connect();
        const service = await server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
        characteristicBLE = await service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
        console.log("Connected to Security System!");

        if (characteristicBLE) {
            try {
                const encoder = new TextEncoder();
                const jsonString = JSON.stringify(value);
                const valueArray = encoder.encode(jsonString); 
                await characteristicBLE.writeValue(valueArray);

                firebaseFunction();
    
                // Đọc lại phản hồi từ ESP32 để kiểm tra
                const response = await characteristicBLE.readValue();
                const decoder = new TextDecoder("utf-8");
                const responseText = decoder.decode(response);
    
                console.log("Response from Security System:", responseText);
                alert(`Security System response: ${responseText}`);
            } catch (error) {
                console.error("Failed to send value:", error);
            }
        } else {
            alert("Not connected to Security System!");
        }
    } catch (error) {
        console.error("Bluetooth connection failed:", error);
        alert("Bluetooth connection failed: " + error.message);
    }
}