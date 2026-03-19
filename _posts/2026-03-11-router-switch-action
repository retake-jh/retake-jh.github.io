---
title: "[Network-Router/Switch] 라우터/스위치 동작 방식"
date: 2026-03-19 9:50:00 +0900
categories: [Network, Router/Switch]
tags: [Network, Router, Switch]
---

## 1. 라우터와 스위치

### 스위치 동작 방식

- 학습(Learning)
  - 수신된 데이터의 출발지 MAC주소와 이에 해당하는 포트를 MAC Table에 기록
- 전달(forwarding)
  - 수신된 데이터의 목적지 MAC주소를 MAC Table을 확인하여 해당하는 포트에 전달
- Flooding
  - 수신된 데이터의 목적지 MAC주소가 MAC Table에 없는 경우 수신한 인터페이스를 제외한 모든 인터페이스로 전달(이러한 방식이 허브에서도 사용되는데 스위치가 처음 부팅하면 MAC Table에 아무것도 없기에 허브처럼 동작한다.)
- 필터(filtering)
  - 수신된 데이터의 목적지 MAC주소를 MAC Table을 확인하여 전달된, 나머지 인터페이스를 막음
- 에이징(Aging)
  - 수신된 데이터의 MAC Table을 어느 정도 지나고 나면 이 정보를 MAC Table에서 지움(새로운 MAC 주소를 기억해야 하기 때문에)
  
### 라우터 동작 방식

- 경로 결정(Routing)
  - 정적 라우팅과 동적 라우팅을 통해 결정된 경로를 Routing Table에 등록
- 패킷 전달(Packet Switching)
  - 수신된 데이터의 목적지 IP 주소를 Routing Table에 등록된 경로를 따라 데이터를 전달
  
## 2. 모드(Mode)

- 사용자 모드(User Exec Mode)
  - 제한된 실행 명령어를 사용할 수 있는 모드
  - 장치의 기본적인 정보 확인만 가능하며, 장치 설정은 불가능
  - `Router>`으로 표시
- 관리자 모드(특권 실행 모드-Privileged Exec Mode)
  - **모든 실행 명령어**를 사용할 수 있는 모드
  - 장치의 상태를 확인하기 위한 정보 확인 기능
  - `Router#`으로 표시
- 전역설정 모드(Global Configuration Mode)
  - 설정 명렁어를 사용할 수 있는 모드
  - 장치 전체이 관련된 설정 가능
  - `Router(config)#`으로 표시
  