---
layout: page
lang: pl
translation_key: returns
title: Zwroty i reklamacje
nav_title: Zwroty i reklamacje
permalink: /pl/zwroty-i-reklamacje/
description: Jak zwrócić produkt lub zgłosić reklamację w sklepie Elense Leatherworks.
# SZKIC. Zanim ustawisz `published: true`: uzupełnij _data/shop.yml (fragmenty oznaczone
# na stronie „DO UZUPEŁNIENIA” znikną same) i sprawdź treść — najlepiej z prawnikiem.
published: false
---
{% assign shop = site.data.shop %}
{% assign seller = shop.seller %}
{% assign missing = "[DO UZUPEŁNIENIA]" %}
{% assign seller_name = seller.legal_name | default: missing %}
{% assign seller_email = seller.complaints_email | default: site.email %}
{% capture seller_address %}{% if seller.street and seller.city %}{{ seller.street }}, {{ seller.postal_code }} {{ seller.city }}{% else %}{{ missing }}{% endif %}{% endcapture %}
{% assign return_days = shop.returns.days | default: 14 %}

## Zwrot w {{ return_days }} dni

Masz {{ return_days }} dni od otrzymania przesyłki, aby odstąpić od umowy bez podania przyczyny.

1. Napisz na [{{ seller_email }}](mailto:{{ seller_email }}), podając numer zamówienia i informację, że odstępujesz od umowy. Możesz użyć wzoru poniżej.
2. Odeślij produkt w ciągu 14 dni na adres: {{ seller_name }}, {{ seller_address }}. {% if shop.returns.shipping_paid_by == "seller" %}Koszt odesłania pokrywam ja.{% elsif shop.returns.shipping_paid_by == "customer" %}Bezpośredni koszt odesłania rzeczy ponosi Kupujący.{% else %}{{ missing }} (kto ponosi koszt odesłania){% endif %}
3. Pieniądze, wraz z kosztem najtańszej oferowanej dostawy, zwracam w ciągu 14 dni tą samą metodą płatności.

Produkt powinien wrócić w stanie niezmienionym; odpowiadasz za zmniejszenie jego wartości wynikające z używania wykraczającego poza sprawdzenie charakteru i cech rzeczy.

### Wyjątek: personalizacja

Prawo odstąpienia nie obejmuje produktów wykonanych według Twojej specyfikacji, np. z inicjałami lub w indywidualnym wymiarze.

### Wzór oświadczenia

> Ja, [imię i nazwisko], informuję o odstąpieniu od umowy sprzedaży następujących rzeczy: [nazwa produktu], zamówienie nr [numer], otrzymane dnia [data]. [adres], [data]

## Reklamacje

Jeśli produkt ma wadę, napisz na [{{ seller_email }}](mailto:{{ seller_email }}) i dołącz zdjęcia. Odpowiem w ciągu 14 dni. W zależności od sytuacji przysługuje Ci naprawa, wymiana, obniżenie ceny albo zwrot pieniędzy.

Skóra naturalna zmienia się w trakcie używania: ciemnieje, nabiera patyny i drobnych śladów. To cecha materiału, a nie wada.

## Gwarancja

Każdy produkt ma 12-miesięczną gwarancję na wykonanie i łączenia materiału. Gwarancja nie ogranicza uprawnień wynikających z przepisów o niezgodności towaru z umową.
