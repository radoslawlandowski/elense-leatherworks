---
layout: page
lang: en
translation_key: shipping
title: Shipping and Payment
nav_title: Shipping and payment
permalink: /en/shipping-and-payment/
description: Delivery costs, delivery times and payment methods at Elense Leatherworks.
# SZKIC. Zanim ustawisz `published: true`: uzupełnij _data/shop.yml (fragmenty oznaczone
# na stronie „DO UZUPEŁNIENIA” znikną same) i sprawdź treść — najlepiej z prawnikiem.
published: false
---
{% assign shop = site.data.shop %}
{% assign seller = shop.seller %}
{% assign missing = "[TO BE COMPLETED]" %}
{% assign seller_name = seller.legal_name | default: missing %}
{% assign seller_email = seller.complaints_email | default: site.email %}
{% capture seller_address %}{% if seller.street and seller.city %}{{ seller.street }}, {{ seller.postal_code }} {{ seller.city }}{% else %}{{ missing }}{% endif %}{% endcapture %}
{% assign return_days = shop.returns.days | default: 14 %}

## Processing time

In-stock products ship within {% if shop.handling_days.in_stock.max %}{{ shop.handling_days.in_stock.min | default: 1 }}–{{ shop.handling_days.in_stock.max }}{% else %}{{ missing }}{% endif %} business days of receiving payment. Made-to-order and personalized products are made within {% if shop.handling_days.made_to_order.max %}{{ shop.handling_days.made_to_order.min | default: 1 }}–{{ shop.handling_days.made_to_order.max }}{% else %}{{ missing }}{% endif %} business days.

## Delivery options and costs

{% assign zones = shop.shipping_zones | where: "currency", "USD" %}
{% for zone in zones %}
- **{{ zone.carrier | default: missing }}** ({{ zone.countries | join: ", " }}): {% if zone.rate != nil %}${{ zone.rate }}{% else %}{{ missing }}{% endif %}{% if zone.free_from %}, free from ${{ zone.free_from }}{% endif %}{% if zone.transit_days.max %}, delivered in {{ zone.transit_days.min | default: 1 }}–{{ zone.transit_days.max }} business days after dispatch{% endif %}.
{% endfor %}

Orders are shipped from Poland. Import duties and taxes charged in the destination country, if any, are paid by the buyer. Orders delivered within Poland are handled by the [Polish version of the shop]({{ '/pl/dostawa-i-platnosc/' | relative_url }}).

## Payment

Available payment methods: {% if shop.payments.en.size > 0 %}{{ shop.payments.en | join: ", " }}{% else %}{{ missing }}{% endif %}. You pay in the secure Snipcart checkout; I do not store card details.

## Questions

Write to [{{ site.email }}](mailto:{{ site.email }}) — I usually answer within one business day.
