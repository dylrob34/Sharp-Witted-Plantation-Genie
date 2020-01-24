#include <SoftwareSerial.h>
SoftwareSerial mySerial(2, 3); // RX, TX

//////////////////////////////////////////////////////////////////////////
void OK_config()
{  
 while(1)
  {
char OK[2]="";
   OK[0]=mySerial.read();
   if(OK[0]=='O')
     {
      OK[1]=mySerial.read();
      if(OK[1]=='K')
        {
        break;
        }
     }
   delay(20);
   }  
}
//////////////////////////////////////////////////////////////////////////
void esp8266_config()
{
  Serial.println("AT+RST");   
  delay(1000);
  mySerial.println("AT+CWMODE_DEF=3");   //set the current Wi-Fi mode and save to Flash
  OK_config();
  mySerial.println("AT+CWSAP=\"KEYES_server\",\"123456789\",11,2");
  OK_config();
  mySerial.println("AT+CIPMUX=1");       //multiple connection   default port=333
  OK_config();
  mySerial.println("AT+CIPSERVER=1");    //build TCP Server
  OK_config();
  Serial.println("Initialize the server!");
  digitalWrite(13,HIGH);
  OK_config();                          //wait Client to send OK; access to Client
}
///////////////////////////////////////////////////////////////////////
void setup() 
{ 
  Serial.begin(115200);
  mySerial.begin(115200);
  pinMode(13,OUTPUT);
  digitalWrite(13,LOW);
  esp8266_config();
}
void loop()
{
 mySerial.println("AT+CIPSEND=0,9"); 
 delay(1000);
 mySerial.println("arduino"); 
 digitalWrite(13,LOW);
 delay(1000);
 digitalWrite(13,HIGH);
 delay(1000);
}
