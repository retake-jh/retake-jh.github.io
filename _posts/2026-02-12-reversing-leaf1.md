---
title: "[Reversing-leaf] Part 1 - CH8 abex' crackme #2"
date: 2026-03-19 18:16:00 +0900
categories: [Reversing, Reversing-leaf]
tags: [Reversing, Reversing-leaf]
toc: true
---

## 학습 범위

- 책: **리버싱 핵심원리**_이승원
- part/chapter: Part 1 / CH8 abex' crackme #2
- 읽은 페이지: p.95 ~ p.101
- 내용: abex' carckme #2 실습

---

## Visual Basic 특징

- VB 전용 엔진
VB 파일은 MSVBVM60.dll이라는 VB전용 엔진을 사용한다. 동작구조를 설명하면 VB의 소스코드에서 MsgBox()를 사용하면 VB 컴파일러에서는 MSVBVM60.dll!rtcMsgBox()를 호출하고 이 함수는 Winapi인 user32.dll!MessageBoxW()가 호출된다(소스코드에서 user32.dll!MessageBoxW() 직접 호출할 수도 있다)

- N-code(Native code) P-code(Pseudo code)
N-code는 소스 코드를 기계어(IA-32 instruction)로 컴파일 하는 반면에 P-code는 가상머신(MSVBVM60.dll)이 해석해야 하는 인터프린터 방식이다

- Event handler
  - VB는 주로 GUI 프로그래밍을 할때 사용한다
  - windows 운영체제의 Event Driven 방식으로 동작한다
  - winmain 혹은 main에 사용자 코드가 존재하는 게 아닌 각 Event handler에 사용자 코드가 존재한다
  - 쉽게 말해서 Event(사용자의 입력이나 클릭 등)에 따라 사용자의 코드가 실행되게 한다
  
- undocumanted 구조체
VB에서 사용되는 각종 정보들은 구조체 형식으로 파일에 저장된다. 하지만 Microsoft에서는 이러한 정보를 공식적으로 공개하지 않았기에 디버깅에 어려움이 있을 수 있다.

## abex' crackme #2 Debugging

처음 EP(Entry point)를 보면 push 다음에 call <JMP.&ThunRTMain>을 볼 수 있다. 여기서 흥미로운 점이 있는데 바로 ThunRTMain으로 가는 것이 아닌 jmp ThunRMain으로 가서 ThunRMain으로 이동하는 간접 호출을 사용한다.

## 핵심 코드 찾기

프로그램을 실행하면 Name과 Serial를 입력할 수 있는 곳이 나와있다. 아무거나 입력값을 넣어주면 Nope, this serial is wrong! 이라는 MsgBox가 뜨는 것을 볼 수 있다. 그럼 sirial를 검사하는 사용자 코드를 찾기 위해 문자열 검색으로 핵심 코드가 있는 곳까지 이동한다.
