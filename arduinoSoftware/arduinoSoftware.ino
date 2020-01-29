

void setup() {
  // put your setup code here, to run once:
  
  Serial.begin(115200);

}

void loop() {
  delay(5000);
  Serial.println("{\"username\":\"dylana1998\",\"password\":\"admin\"}");

}
