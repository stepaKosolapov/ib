---
## Front matter
lang: ru-RU
title: Дискреционное разграничение прав в Linux. Основные атрибуты
author: |
	 Косолапов Степан \inst{1}

institute: |
	\inst{1}Российский Университет Дружбы Народов

date: 23 сентября, 2023, Москва, Россия

## Formatting
mainfont: Calibri
romanfont: Calibri
sansfont: Calibri
monofont: Calibri
toc: false
slide_level: 2
theme: metropolis
header-includes:
 - \metroset{progressbar=frametitle,sectionpage=progressbar,numbering=fraction}
 - '\makeatletter'
 - '\beamer@ignorenonframefalse'
 - '\makeatother'
aspectratio: 43
section-titles: true

---

# Цели и задачи работы

## Цель лабораторной работы

Получение практических навыков работы в консоли с атрибутами файлов для групп пользователей.

# Процесс выполнения лабораторной работы

## Создаём нового пользователя

![Создание пользователя](../img/image2.png)

## Определяем UID и группу двух пользователей

![Информация о пользователях](../img/image6.png)

## Файл с данными о группах

![Сожержимое файла /etc/group](../img/image7.png)

## Регистрация в группе

![Регистрация в группе](../img/image8.png)

## Атрибуты директории

![Добавление атрибутов в директории](../img/image9.png)

## Makefile 1

![Makefile 1](../img/image10.png)

## Makefile 2

![Makefile 2](../img/image11.png)

## Определяем права для группы

![Проверка прав для группы](../img/image12.png)

## Заполнение таблицы

![Минимальные права](../img/image13.jpg)

# Выводы по проделанной работе

## Вывод

В ходе выполнения работы, мы смогли приобрести практические навыки работы в консоли с атрибутами файлов для групп пользователей.
