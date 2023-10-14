---
## Front matter
lang: ru-RU
title: "Мандатное разграничение прав в Linux"
author: |
	 Косолапов Степан \inst{1}

institute: |
	\inst{1}Российский Университет Дружбы Народов

date: 14 октября, 2023, Москва, Россия

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

Развить навыки администрирования ОС Linux. Получить первое практическое знакомство с технологией SELinux.
Проверить работу SELinx на практике совместно с веб-сервером Apache.

# Процесс выполнения лабораторной работы

## getenforce и sestatus

![getenforce и sestatus](../img/image1.png)

## Контекст безопасности процессов httpd

![контекст безопасности процессов httpd](../img/image3.png)

## Cтатистика по политике

![статистика по политике](../img/image5.png)

## Контекст файлов и директорий

![данные о содержимом /var/www/](../img/image6.png)

## Создание тестового html файла

![test.html](../img/image7.png)

## Контекст созданных файлов

![контекст test.html](../img/image8.png)

## Проверка доступа

![test.html в браузере](../img/image9.png)

## Смена контекста

![смена контекста](../img/image10.png)

## Ошбики при доступе к файлу с изменённым контекстом

![системные логи](../img/image12.png)

## Прослушивание порта не в http_port_t

![создание файла в sticky директории](../img/image17.png)

# Выводы по проделанной работе

## Вывод

В данной работе мы развили навыки администрирования ОС Linux. Получили первое практическое знакомство с технологией SELinux.
Проверили работу SELinx на практике совместно с веб-сервером Apache.
