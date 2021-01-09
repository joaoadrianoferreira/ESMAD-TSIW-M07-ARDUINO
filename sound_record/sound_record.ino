#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <ESP8266HTTPClient.h>
Ticker flipper;

const char* ssid = "sdfsdddf";
const char* password = "sdadasd";

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
