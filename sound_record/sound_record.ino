#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <ESP8266HTTPClient.h>
Ticker flipper;

const char* ssid = "xxxxxxx";
const char* password = "xxxxxxxx";

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
    Serial.print(sound);
    Serial.println();
    HTTPClient http; 
    String data = "{\n\t\t\"value\" : \"";
    data.concat(sound); 
    data.concat("\"}");     
    http.begin("https://sound-records.herokuapp.com/records", "B8 B9 B1 3F 37 1F 2B 1B 38 E8 A7 72 8E 29 12 07 1E 1F 98 E8");
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(data);
    String payload = http.getString(); 
    delay(5000);
    http.end(); 
}