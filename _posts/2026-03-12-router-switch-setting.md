---
title: "[Network-Router/Switch] 라우터/스위치 세팅 및 기본 명령어 정리"
date: 2026-03-12 11:06:00 +0900
categories: [Network, Router/Switch]
tags: [Network, Router, Switch]
---

## 각종 명령어

### 1. 기본 모드

|**모드**|**프롬프트**|**기능**|
|---|---|---|
|**사용자 모드(user mode)**|`Router>`|명령어 사용에 제약이 있으며, 장치 설정이 불가능|
|**관리자 모드(privileg mode)**|`Router#`|명령어 사용에 제약이 없으며 장치의 설정 내용을 볼 수 있음|
|**설정 모드(cofiguration mode)**|`Router(config)#`|장치 설정작업 수행|
|**라인 설정 모드(line configuration mode)**|`Router(config-line)#`|로그인 시 필요한 구성들을 접속 형태에 따라 구성할 수 있는 모드|
|**인터페이스 모드(interface mode)**|`Router(config-if)#`|인터페이스 활성화시키기 위한 모드|

### 2. 주요 설정 명령어

|**명령어**|**기능**|
|---|---|
|**enable or en**|관리자 모드로 들어가는 명령 -> `Router#`|
|**configure terminal or conf t**|관리자 모드에서 설정 모드로 돌아가는 명령 -> `Router(config)#`|
|**hostname [name]**|호스트 이름 변경|
|**login**|로그인 명령|
|**exit**|나가기 명령(이전 모드로 돌아감)|
|**end**|어떤 모드에 있는지 무조건 관리자 모드로 돌아감|
|**line console 0**|콘솔 라인 모드 전환|
|**line vty**|텔넷 등 가상 터미널 전환 명령|
|**enable password [password]**|관리자 모드로 엑세스 할 때 암호를 설정-암호화되어 저장되지 않음|
|**enable secret [password]**|관리자 모드로 엑세스 할 때 암호 설정-암호화되어 저장|
|**erase startup-config**|라우터 설정 명령을 지우고 초기화 하는 명령|
|**clock set [시:분:초] [일] [월] [연도]**|장비의 시간을 설정할 때 사용하는 명령|
|**exec-timeout [min] [sec]**|입력이 없을 때 세션을 종료하는 시간 변경|
|**copy running-config startup-config or copy r st**|라우터 셋팅 내용을 NVRAM에 저장|

### 3. 설정 확인 명령어 - show

|**명령어**|**기능**|
|---|---|
|**show clock**|라우터에 설정된 시간을 확인하는 명령|
|**show version**|IOS의 버전 정보 확인과 S/W, H/W 정보 확인|
|**show startup-config**|NVRAM 정보 확인|
|**show config**|라우터 장비 설정의 저장 내용을 확인하는 명령|
|**show run**|설정된 인터페이스 확인|
|**show ip interface brief**|인터페이스 정보 확인|
|**show history**|사용했던 전체 명령어 확인|

## 기본 세팅

```bash
Router>enable
Router#configure terminal ==> conf t
Router(config)#hostname R1


R1(config)#banner motd $ 
Hello  ~hi ~~welcome~~
$

R1(config)#line console 0
R1(config-line)#password cisco
R1(config-line)#login
R1(config-line)#exec-timeout 0
R1(config-line)#logging synchronous
R1(config-line)#exit

R1(config)#enable password cisco
R1(config)#enable secret cisco
R1(config)#no ip domain-lookup
R1(config)#line vty 0 4

R1(config-line)#password cisco
R1(config-line)#login

R1#show running-config
R1#copy running-config startup-config
```

## VLAN 세팅

### 실습 과정

- 사용자 pc1(f0/1)와 pc2(f0/2)를 VLAN 2에 연결하고 pc2(f0/3)와 pc2(f0/4)를 VLAN 3에 연결한다

```bash
// 각 vlan 이름 설정
SW1(config)# vlan 2
SW1(config-vlan)# name pc1&pc2
SW1(config)# vlan 3
SW1(config-vlan)# name pc3&pc3

SW1(config-vlan)# exit

// f0/1, f0/2에 VLAN 2 할당하기
SW1(config)# interface FastEthernet0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 2
SW1(config-if)# interface FastEthernet0/2
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 2

SW1(config-if)# exit

// f0/3, f0/4에 VLAN 3 할당하기
SW1(config)# interface FastEthernet0/3
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 3
SW1(config-if)# interface FastEthernet0/4
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 3
```
