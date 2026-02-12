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
#include <windows.h>
#include <tchar.h>

int _tmain() {
	MessageBox(NULL, L"Hello world!", L"www.reversecore.com", MB_OK);
	return 0;
}
```
{: data-file="HelloWorld.cpp"}