---
## Front matter
lang: ru-RU
title: "Дискреционное разграничение прав в Linux. Исследование влияния дополнительных атрибутов"
author: |
	 Косолапов Степан \inst{1}

institute: |
	\inst{1}Российский Университет Дружбы Народов

date: 7 октября, 2023, Москва, Россия

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

Изучение механизмов изменения идентификаторов, применения
SetUID- и Sticky-битов. Получение практических навыков работы в консоли с дополнительными атрибутами. Рассмотрение работы механизма
смены идентификатора процессов пользователей, а также влияние бита
Sticky на запись и удаление файлов.

# Процесс выполнения лабораторной работы

## Файл simpleid 

![simpleid.c](../img/image1.png)

## Работа файла simpleid 

![сравнение вывода simpleid.c и id](../img/image3.png)

## Файл simpleid2

![компиляция и запуск simpleid2.c](../img/image5.png)

## Установка setuid бита

![устанавливаем владельца файла simpleid2 и добавляем setuid бит](../img/image6.png)

## Выполнение файла simpleid2 с битом setuid

![выполняем simpleid2 с битом setuid](../img/image7.png)

## Файл readfile.c

![readfile.c](../img/image8.png)

## Установка прав на файл readfile.c только для root

![установка прав на файл readfile.c только для root](../img/image9.png)

## Установка setuid бита на файл readfile

![установка setuid бита на файл readfile](../img/image10.png)

## чтение readfile.c с помощью readfile с установленным setuid битом

![чтение readfile.c с помощью readfile с установленным setuid битом](../img/image11.png)

## Создание файла в sticky директории

![создание файла в sticky директории](../img/image13.png)

## Операции над файлом в sticky директории

![операции над файлом в sticky директории](../img/image14.png)

## Операции над файлом в директории без sticky

![операции над файлом в директории без sticky](../img/image16.png)

# Выводы по проделанной работе

## Вывод

В данной работе мы изучили атрибуты sticky, и биты setgid и setuid и их влияние на различные аспекты работы системы.
