---
layout: page
lang: pl
translation_key: shipping
title: Dostawa i płatność
nav_title: Dostawa i płatność
permalink: /pl/dostawa-i-platnosc/
description: Koszty i czas dostawy oraz metody płatności w sklepie Elense Leatherworks.
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

## Czas realizacji

Produkty „dostępne od ręki” wysyłam w ciągu {% if shop.handling_days.in_stock.max %}{{ shop.handling_days.in_stock.min | default: 1 }}–{{ shop.handling_days.in_stock.max }}{% else %}{{ missing }}{% endif %} dni roboczych od zaksięgowania płatności. Produkty „na zamówienie” oraz personalizowane wykonuję w ciągu {% if shop.handling_days.made_to_order.max %}{{ shop.handling_days.made_to_order.min | default: 1 }}–{{ shop.handling_days.made_to_order.max }}{% else %}{{ missing }}{% endif %} dni roboczych.

## Koszt i sposób dostawy

{% assign zones = shop.shipping_zones | where: "currency", "PLN" %}
{% for zone in zones %}
- **{{ zone.carrier | default: missing }}** ({{ zone.countries | join: ", " }}): {% if zone.rate != nil %}{{ zone.rate }} zł{% else %}{{ missing }}{% endif %}{% if zone.free_from %}, bezpłatnie od {{ zone.free_from }} zł{% endif %}{% if zone.transit_days.max %}, doręczenie w {{ zone.transit_days.min | default: 1 }}–{{ zone.transit_days.max }} dni roboczych od nadania{% endif %}.
{% endfor %}

Zamówienia spoza Polski obsługuje [angielska wersja sklepu]({{ '/en/shipping-and-payment/' | relative_url }}).

## Płatność

Dostępne metody płatności: {% if shop.payments.pl.size > 0 %}{{ shop.payments.pl | join: ", " }}{% else %}{{ missing }}{% endif %}. Płatność odbywa się w bezpiecznym koszyku Snipcart; nie przechowuję danych kart płatniczych.

## Pytania

Napisz na [{{ site.email }}](mailto:{{ site.email }}) — odpowiadam zwykle w ciągu jednego dnia roboczego.
