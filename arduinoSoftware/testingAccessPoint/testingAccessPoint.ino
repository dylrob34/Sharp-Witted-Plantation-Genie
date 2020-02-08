#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>

ESP8266WebServer server(80);

struct creds {
  string ssid;
  string password;
}

void setup()
{
  Serial.begin(115200);
  Serial.println();
  
  info = EEPROM.read(0);
  if (info == 255)
  {
    Serial.print("Setting soft-AP ... ");
    boolean result = WiFi.softAP("PlantGenie");
    if(result == true)
    {
      Serial.println("Ready");
    }
    else
    {
      Serial.println("Failed!");
    }

    getSSID();
  }

  
}

void loop()
{
  Serial.printf("Stations connected = %d\n", WiFi.softAPgetStationNum());
  delay(3000);
}

void handleRequest()
{
  String content = "<html><body><form action='/login' method='POST'>";
  content += "User:<input type='text' name='SSID' placeholder='Enter Wifi SSID'><br>";
  content += "Password:<input type='password' name='PASSWORD' placeholder='password'><br>";
  content += "<input type='submit' name='SUBMIT' value='Submit'></form><br>";
  server.send(200, "text/html", content);
}

void getSSID()
{
  while (true)
  {
    WiFi.
  }
}
