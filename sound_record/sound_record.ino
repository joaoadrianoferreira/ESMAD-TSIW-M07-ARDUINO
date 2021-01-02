#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <ESP8266HTTPClient.h>
Ticker flipper;

const char* ssid = "Vodafone-048160";
const char* password = "t6Vw9XqR5Y";

const char* host = "www.google.com";

WiFiClient client;

void setup() {
  Serial.begin(115200);
  Serial.println();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("connected");   
  delay(10);    
}

void function() {
  
  Serial.printf("\n[Connecting to %s ... ", host);
  if (client.connect(host, 80))
  {
    Serial.println("connected]");

    Serial.println("[Sending a request]");
    client.print(String("GET /") + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n" +
                 "\r\n"
                );

    Serial.println("[Response:]");
    while (client.connected() || client.available())
    {
      if (client.available())
      {
        String line = client.readStringUntil('\n');
        Serial.println(line);
      }
    }
    client.stop();
    Serial.println("\n[Disconnected]");
  }
  else
  {
    Serial.println("connection failed!]");
    client.stop();
  }
  delay(5000);
}

void loop() { 
  int val_analog = analogRead(A0);
  saveRecord(val_analog);      
}

void saveRecord(int sound) {
    HTTPClient http; 
    String data = "{\n\t\t\"value\" : \"";
    data.concat(sound); 
    data.concat("\"}");     
    http.begin("https://sound-records.herokuapp.com/records", "94 FC F6 23 6C 37 D5 E7 92 78 3C 0B 5F AD 0C E4 9E FD 9E A8");
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(data);
    String payload = http.getString(); 
    delay(5000);
    http.end(); 
}
