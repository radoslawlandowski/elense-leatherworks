---
layout: page
lang: en
translation_key: returns
title: Returns and Complaints
nav_title: Returns and complaints
permalink: /en/returns/
description: How to return a product or make a complaint at Elense Leatherworks.
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

## {{ return_days }}-day returns

You have {{ return_days }} days from receiving your parcel to withdraw from the purchase without giving a reason.

1. Write to [{{ seller_email }}](mailto:{{ seller_email }}) with your order number and a statement that you are withdrawing.
2. Send the product back within 14 days to: {{ seller_name }}, {{ seller_address }}, Poland. {% if shop.returns.shipping_paid_by == "seller" %}I cover the cost of sending the goods back.{% elsif shop.returns.shipping_paid_by == "customer" %}The buyer bears the direct cost of sending the goods back.{% else %}{{ missing }} (who pays for return shipping){% endif %}
3. I refund the payment, including the cost of the cheapest delivery offered, within 14 days, using the same payment method.

The product should come back unchanged; you are liable for any loss of value caused by use beyond what is needed to check it.

### Exception: personalized products

Products made to your specification, for example with initials or in a custom size, cannot be returned.

## Complaints

If a product is defective, write to [{{ seller_email }}](mailto:{{ seller_email }}) and attach photos. I will answer within 14 days. Depending on the case you are entitled to a repair, a replacement, a price reduction or a refund.

Genuine leather changes with use: it darkens, develops a patina and picks up small marks. That is a property of the material, not a defect.

## Warranty

Every product carries a 12-month workmanship warranty. It does not limit your statutory rights.
