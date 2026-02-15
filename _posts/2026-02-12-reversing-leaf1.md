---
title: "[Reversing-leaf] Part 1 - CH2 Hello World! 리버싱"
date: 2026-02-12 18:16:00 +0900
categories: [reversing, reversing-leaf]
tags: [reversing, reversing-leaf]
toc: true
toc_sticky: true
toc_label: "목차"
---

## 학습 범위
- part/chapter: Part 1 / CH2 Hello world! 리버싱
- 읽은 페이지: p.13 ~ p.47
- 목표: Hello World.exe를 분석하여 x96dbg의 사용법 및 원하는 함수를 빨리 찾을 방법 습득

---

## 1) HelloWorld.cpp 소스코드 분석
```cpp
#include <windows.h> // (1)
#include <tchar.h> // (2)

int _tmain() { (3)
	MessageBox(NULL, L"Hello world!", L"www.reversecore.com", MB_OK); (4)
	return 0;
}
```
{: data-file="HelloWorld.cpp"}

- `#include <windows.h>` 는 `winAPI`를 사용하기 위한 헤더 파일이다
- `#include <tchar.h>` 는 컴파일러의 설정 만으로 유니코드(WCHAR/wchar_t)와 아스키코드(CHAR/char)를 간편하게 변경할 수 있게 해주는 헤더 파일이다
    - `tchar.h`가 유니코드를 사용하게 해주는 것은 아니다. 유니코드는 `Window.h` 헤더 파일안에 있는 `winnt.h` 에 있는 **wchar_t** 자료형으로 2바이트로 처리하게 된다. 여기서 핵심은 `tchar.h`은 그저 전처리 과정에서 컴퍼일러 설정을 확인한 후 밑의 메크로를 통해 설정에 맞는 자료형으로 치환해줄 뿐이다.
    ```cpp
    #ifdef UNICODE
        typedef WCHAR TCHAR;
    #else
        typedef CHAR TCHAR;
    #endif
    ```

- _tmain은 위와 비슷하게 tchar.h에서 컴파일러 설정에 따라 **wmain(wmain(int argc, wchar_t* argv[]))** 과 **main(main(int argc, char* argv[]))** 으로 치환된다.
- **MessageBox** 는 간단한 메시지나 오류 등을 창으로 띄울 수 있게 하는 함수이다. 이 함수도 위와 비슷하게 컴파일러 설정에 따라 **MassageBoxA(ANSI)** 와 **MassageBoxW(unicode)** 로 치환된다.
- 문자열 앞에 있는 **L**은 이 문자열이 **wide string** 이란 것을 알려주는 것이다.
    - **wide string(wstring)** 이란 1바이트보다 큰 바이트를 사용하여 유니코드 등을 표현하는 문자열이다.

## 2) HelloWorld.exe debugging

### 2-1) HelloWorld.cpp를 release 모드로 빌드해준다(debug 모드 일때에는 디버깅 정보도 추가되어 release 모드 보다 디버깅하기 힘듬)

### 2-2) x32dbg에 대해 간단히 알아보기(x64dbg도 거의 같음)
- (1) code window: 명령어, 주석 등이 나와있다
- (2) dump window: 메모리에 들어있는 문자열이나 포인터들을 확인할 수 있다
- (3) register window: `EAX`, `ECX` 등 레지스터안에 들어있는 값을 확인할 수 있다
- (4) argument window: 함수을 `call`함으로써 함수에 전달하는 인자값을 확인할 수 있다(x32라서 stack에 있는 인자값을 보여주고 있다)
- (5) stack window: `stack` 안에 있는 값을 보여준다.

### 2-3) HelloWorld.exe를 x32dbg로 debugging 해준다.
- 처음에 멈춘 곳은 `EP`(Entry Point)라고 한다.

### 2-4) 

### 