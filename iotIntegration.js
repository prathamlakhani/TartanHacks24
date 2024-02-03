const mqtt = require('mqtt');

// Connect to MQTT broker
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Subscribe to topics
  client.subscribe('sensor/temperature');
  client.subscribe('sensor/humidity');
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // Process the incoming data and store it in the database
  // Example: Store temperature and humidity data in MongoDB
});

// Publish data to MQTT broker (For testing purposes)
function publishSensorData() {
  setInterval(() => {
    const temperature = Math.random() * 50; // Generate random temperature data
    const humidity = Math.random() * 100; // Generate random humidity data

    client.publish('sensor/temperature', temperature.toString());
    client.publish('sensor/humidity', humidity.toString());
  }, 5000); // Publish data every 5 seconds
}

publishSensorData(); // Start publishing sensor data
