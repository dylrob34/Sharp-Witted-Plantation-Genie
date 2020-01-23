create table User (
firstName varchar(20) not null,
lastName varchar(20) not null,
userName varchar(20) primary key,
password varchar(100) not null,
email varchar(40)
);

create table DeviceType (
size char(1) primary key,
tankSize decimal(4, 1)
);

create table Plant (
name varchar(20) primary key,
recommendedMoisture decimal(2, 2)
);

create table Device (
ID INT primary key auto_increment,
deviceType char(1) not null references DeviceType(size),
registeredUser varchar(20) not null references User(userName),
plantMonitering varchar(50) not null references Plant(name),
waterLevel decimal(4, 1) not null
);