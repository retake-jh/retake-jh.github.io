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

## 1) Hello world.exe 소스코드 분석
```cpp
#include <windows.h> // (1)
#include <tchar.h> // (2)

int _tmain() { (3)
	MessageBox(NULL, L"Hello world!", L"www.reversecore.com", MB_OK); (4)
	return 0;
}
```
{: data-file="HelloWorld.cpp"}

- #include <windows.h> 는 winAPI를 사용하기 위한 헤더 파일이다
- #include <tchar.h> 는 컴파일러의 설정 만으로 유니코드(WCHAR/wchar_t)와 아스키코드(CHAR/char)를 간편하게 변경할 수 있게 해주는 헤더 파일이다
    - {: .notice--warning}
    <헷갈리는 포인트>
    tchar.h가 유니코드를 사용하게 해주는 것이 아니다. 유니코드는 Window.h 헤더 파일안에 있는 winnt.h 에서 **wchar_t** 자료형으로 2바이트로 처리하게 된다. 여기서 핵심은 tchar.h은 그저 전처리 과정에서 컴퍼일러 설정을 확인한 후 밑의 메크로를 통해 설정에 맞는 자료형으로 치환해준다.
    ```cpp
    #ifdef UNICODE
        typedef WCHAR TCHAR;
    #else
        typedef CHAR TCHAR;
    #endif
    ```
- _tmain은 위와 비슷하게 tchar.h에서 컴파일러 설정에 따라 **wmain(wmain(int argc, wchar_t* argv[]))** 과 **main(main(int argc, char* argv[]))** 으로 치환된다.
- **MessageBox** 는 간단한 메시지나 오류 등을 창으로 띄울 수 있게 하는 함수이다. 이 함수도 위와 비슷하게 컴파일러 설정에 따라 **MassageBoxA(ANSI)** 와 **MassageBoxW(unicode)** 로 치환된다.
- 문자열 앞에 있는 L은 이 문자열이 **wide string** 이란 것을 알려주는 것이다.
    - **wide string(wstring)** 이란 1바이트보다 큰 바이트를 사용하여 유니코드 등을 표현하는 문자열이다.