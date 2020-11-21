drop database if exists kyrioskedio;
create database if not exists kyrioskedio;

create table if not exists kyrioskedio.user (
  userid int primary key auto_increment,
  username varchar(30),
  password varchar(30),
  email  varchar(30),
  usertype  varchar(30)
) ;
insert ignore into kyrioskedio.user values
  (1, 'Admin', 'admin','admin@kyrioskedio.com', 'admin');
insert ignore into kyrioskedio.user values
  (2, 'John', 'john','johndoe@gmail.com', 'cw');
insert ignore into kyrioskedio.user values
  (3, 'Jane', 'jane','janedoe@gmail.com', 'cw');

create table if not exists kyrioskedio.event (
  eventid int primary key auto_increment,
  userid int,
  eventdate date,
  inittime char(4),
  endtime  char(4),
  note varchar(300)
) ;
insert ignore into kyrioskedio.event values
  (1, 2, '2020-11-03', '0900', '1100', '');
insert ignore into kyrioskedio.event values
  (2, 2, '2020-11-04', '0900', '1100', '');
insert ignore into kyrioskedio.event values
  (3, 3, '03-11-2020', '1700', '2300', '');

create table if not exists kyrioskedio.revision (
   revisionid int primary key auto_increment,
   workweek int,
   version int
) ;
insert ignore into kyrioskedio.revision values
  (1, 42, 1);
insert ignore into kyrioskedio.revision values
  (2, 43, 2);