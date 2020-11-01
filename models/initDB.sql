drop database kyrioskedio;
create database if not exists kyrioskedio;

create table if not exists kyrioskedio.user (
  userid int primary key auto_increment,
  username varchar(30),
  password varchar(30),
  email  varchar(30),
  userType  varchar(30)
) ;
insert ignore into kyrioskedio.user values
  (1, 'Admin', 'admin','admin@kyrioskedio.com', 'admin');
insert ignore into kyrioskedio.user values
  (2, 'John', 'john','agent1@localhost.es', 'cw');
insert ignore into kyrioskedio.user values
  (3, 'Jane', 'jane','agent2@localhost.es', 'cw');

create table if not exists kyrioskedio.event (
  eventid int primary key auto_increment,
  userid int,
  date varchar(10),
  inittime varchar(8),
  endtime  varchar(8),
  note varchar(300)
) ;
insert ignore into kyrioskedio.event values
  (1, 2, '03-11-2020', '09:00AM', '11:00AM', '');
insert ignore into kyrioskedio.event values
  (2, 2, '04-11-2020', '09:00AM', '11:00AM', '');
insert ignore into kyrioskedio.event values
  (3, 3, '03-11-2020', '05:00PM', '11:00PM', '');

create table if not exists kyrioskedio.revision (
   revisionid int primary key auto_increment,
   workweek int,
   version int
) ;
insert ignore into kyrioskedio.disclosure values
  (1, 42, 1);
insert ignore into kyrioskedio.disclosure values
  (2, 43, 2);