#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include "./DNSServer.h"
#include <ESP8266HTTPClient.h>

ESP8266WebServer server(80);
DNSServer dnsServer;
IPAddress apIP(10, 10, 10, 1);
const byte DNS_PORT = 53;

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
void setup()
{
  Serial.begin(115200);
  Serial.println("Starting...");
  Serial.println("mode: " + WiFi.getMode());
  WiFi.enableAP(true);
  Serial.println("mode: " + WiFi.getMode());
  EEPROM.get(0, wifiInfo);
  Serial.println(wifiInfo.res);
  while (success)
  {
    if (wifiInfo.res != 1)
    {
      Serial.print("Setting soft-AP ... ");
      WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
      boolean result = WiFi.softAP("PlantGenie");
      if(result == true)
      {
        Serial.println("Ready");
      }
      else
      {
        Serial.println("Failed!");
      }
  
      dnsServer.start(DNS_PORT, "*", apIP);
      
      server.onNotFound([]() {
        Serial.println("captured!");
        server.send(200, "text/html", responseHTML);
      });
  
      server.on("/login", handleLogin);
      
      server.begin();
      getTheSSID();
      Serial.println(wifiInfo.ssid);
      Serial.println(wifiInfo.password);
      Serial.println(wifiInfo.res);
      Serial.println("got ssid...connecting");
      WiFi.softAPdisconnect(true);
      WiFi.enableSTA(true);
      String u = wifiInfo.ssid;
      String p = wifiInfo.password;
      WiFi.begin(u, p);
      Serial.println("connecting");
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println(".");
      }
      success = false;
    } else {
      WiFi.enableSTA(true);
      Serial.println("mode");
      Serial.println(WiFi.getMode()); 
      WiFi.begin(wifiInfo.ssid, wifiInfo.password);
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println(".");
      }
      success = false;
    }
    
    
  }
  

  
}

void handleLogin()
{
  Serial.println("getting a response");
  if (server.hasArg("plain") == true)
  {
    String message = server.arg("plain");
    Serial.println("body is: " + message);
    message.remove(0, 5);

    byte index = message.indexOf("&");

    String s = message.substring(0, index);
    Serial.println(ssid);
    message.remove(0, 10 + index);
    index = message.indexOf("&");

    String p = message.substring(0, index);
    Serial.println(password);

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
  String postData = "{\"username\":\"dylana1998\",\"password\":\"admin\"}";
  sendM(postData);
  delay(5000);
}

void getTheSSID()
{
  Serial.println("starting to listen...");
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
  creds c = { 1, username, pass };
  EEPROM.put(0, c);
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

    

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://192.168.137.1/auth/login"); //HTTP
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
    int httpCode = http.POST(postData);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == 200) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
}
}

