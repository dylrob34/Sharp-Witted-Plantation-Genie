#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include "./DNSServer.h"
#include <ESP8266HTTPClient.h>

ESP8266WebServer server(80);
DNSServer dnsServer;
IPAddress apIP(10, 10, 10, 1);
const byte DNS_PORT = 53;

String id = "{\"deviceId\":1\",";

struct creds {
  byte res;
  String ssid;
  String password;
};

bool getCreds = true;
bool success = true;
String ssid;
String password;

String responseHTML = "<!DOCTYPE html><html><head><title>Login</title></head><body><form action='/login' method='POST'>"
                      "User:<input type='text' name='SSID' placeholder='Enter Wifi SSID'><br>"
                      "Password:<input type='password' name='PASSWORD' placeholder='password'><br>"
                      "<input type='submit' name='SUBMIT' value='Submit'></form><br>";

String responseHTMLFailed = "<!DOCTYPE html><html><head><title>Login</title></head><body><h1>Error<!h1><form action='/login' method='POST'>"
                      "User:<input type='text' name='SSID' placeholder='Enter Wifi SSID'><br>"
                      "Password:<input type='password' name='PASSWORD' placeholder='password'><br>"
                      "<input type='submit' name='SUBMIT' value='Submit'></form><br>";
creds wifiInfo;
int count;
void setup()
{
  Serial.begin(115200);
  EEPROM.begin(512);
  EEPROM.get(0, wifiInfo);
  while (success)
  {
    if (wifiInfo.res != 2)
    {
      WiFi.enableAP(true);
      count = 0;
      WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
      boolean result = WiFi.softAP("PlantGenie");
      if(result == true)
      {
        //Serial.println("Ready");
      }
      else
      {
        //Serial.println("Failed!");
      }
  
      dnsServer.start(DNS_PORT, "*", apIP);
      
      server.onNotFound([]() {
        server.send(200, "text/html", responseHTML);
      });
  
      server.on("/login", handleLogin);
      
      server.begin();
      getTheSSID();
      WiFi.softAPdisconnect(true);
      WiFi.enableSTA(true);
      String u = wifiInfo.ssid;
      String p = wifiInfo.password;
      WiFi.begin(u, p);
      while (WiFi.status() != WL_CONNECTED) {
        if (count < 10) {
           delay(500);
           Serial.println(".");
           count += 1;
        } else {
          break;
        }
      }
      if (WiFi.status() == WL_CONNECTED) {
        
      success = false;
      }
    } else {
      WiFi.enableSTA(true);
      WiFi.begin(wifiInfo.ssid, wifiInfo.password);
      while (WiFi.status() != WL_CONNECTED) {
        if (count < 10) {
           delay(500);
           count += 1;
        } else {
          break;
        }
      }
      if (WiFi.status() == WL_CONNECTED) {
        success = false;
      } else {
        wifiInfo.res = 50;
      }
    }
    
    
  }
  

  
}

void handleLogin()
{
  if (server.hasArg("plain") == true)
  {
    String message = server.arg("plain");
    message.remove(0, 5);

    byte index = message.indexOf("&");

    String s = message.substring(0, index);
    message.remove(0, 10 + index);
    index = message.indexOf("&");

    String p = message.substring(0, index);

    setCreds(s, p);
    
    server.send(200, "text/html", "ok");
    getCreds = false;
  } else
  {
    server.send(200, "text/html", responseHTMLFailed);
  }
}

void loop()
{
  String postData = Serial.readString();
  String together = id + postData;
  sendM(together);
}

void getTheSSID()
{
  while (getCreds)
  {
    dnsServer.processNextRequest();
    server.handleClient();
  }
  dnsServer.stop();
  server.close();
}

void setCreds(String username, String pass)
{
  byte stupid = 2;
  creds c = { stupid, username, pass };
  EEPROM.put(0, c);
  EEPROM.end();
  wifiInfo.res = 1;
  wifiInfo.ssid = username;
  wifiInfo.password = pass;
}

void sendM(String postData)
{
  
  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    

    // configure traged server and url
    http.begin(client, "http://dylrob34.mynetgear.com/devices/deviceUpdate"); //HTTP
    http.addHeader("Content-Type", "application/json");

    // start connection and send HTTP header and body
    int httpCode = http.POST(postData);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled

      // file found at server
      if (httpCode == 200) {
        //const String& payload = http.getString();
        //Serial.println("received payload:\n<<");
        //Serial.println(payload);
        //Serial.println(">>");
      }
    } else {
      //Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
}
}

