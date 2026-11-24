---
layout: page
lang: en
translation_key: terms
title: Terms of Sale
nav_title: Terms of sale
permalink: /en/terms/
description: Terms of sale of the Elense Leatherworks online shop — orders, payment, delivery, returns and complaints.
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

**Effective from: {{ missing }}**

## 1. Seller

The online shop at {{ site.url }} is run by {{ seller_name }}, {{ seller_address }}, Poland, tax ID (NIP): {{ seller.nip | default: missing }} ("the Seller").

Contact: [{{ site.email }}](mailto:{{ site.email }}){% if seller.phone %}, phone {{ seller.phone }}{% endif %}.

## 2. Products and prices

1. The shop sells goods handmade from genuine leather. Leather is a natural material: shade, grain and small marks vary between pieces and are not defects.
2. Prices in the English version of the shop are in US dollars. Delivery is charged separately and shown before you place an order. Import duties and taxes charged in the destination country, if any, are paid by the buyer.

## 3. Orders

1. You order by adding a product to the cart and completing the checkout form. No account is needed.
2. The contract is concluded when the order is confirmed by e-mail.
3. Personalized products are made to your specification; I confirm feasibility before making them.

## 4. Payment

Available payment methods: {% if shop.payments.en.size > 0 %}{{ shop.payments.en | join: ", " }}{% else %}{{ missing }}{% endif %}. Payments are processed by the Snipcart cart and its connected payment provider.

## 5. Delivery

In-stock products ship within {% if shop.handling_days.in_stock.max %}{{ shop.handling_days.in_stock.min | default: 1 }}–{{ shop.handling_days.in_stock.max }}{% else %}{{ missing }}{% endif %} business days of receiving payment. Made-to-order and personalized products are made within {% if shop.handling_days.made_to_order.max %}{{ shop.handling_days.made_to_order.min | default: 1 }}–{{ shop.handling_days.made_to_order.max }}{% else %}{{ missing }}{% endif %} business days.

Delivery options and costs:

{% assign zones = shop.shipping_zones | where: "currency", "USD" %}
{% for zone in zones %}
- **{{ zone.carrier | default: missing }}** ({{ zone.countries | join: ", " }}): {% if zone.rate != nil %}${{ zone.rate }}{% else %}{{ missing }}{% endif %}{% if zone.free_from %}, free from ${{ zone.free_from }}{% endif %}{% if zone.transit_days.max %}, delivered in {{ zone.transit_days.min | default: 1 }}–{{ zone.transit_days.max }} business days after dispatch{% endif %}.
{% endfor %}

Details: [Shipping and payment]({{ '/en/shipping-and-payment/' | relative_url }}).

## 6. Right of withdrawal

1. Consumers may withdraw from the contract without giving a reason within {{ return_days }} days of receiving the goods.
2. To withdraw, send a clear statement to [{{ seller_email }}](mailto:{{ seller_email }}) before the period ends, then send the goods back within 14 days. {% if shop.returns.shipping_paid_by == "seller" %}I cover the cost of sending the goods back.{% elsif shop.returns.shipping_paid_by == "customer" %}The buyer bears the direct cost of sending the goods back.{% else %}{{ missing }} (who pays for return shipping){% endif %}
3. The payment, including the cost of the cheapest delivery offered, is refunded within 14 days of receiving the statement, using the same payment method. The refund may be withheld until the goods or proof of return arrive.
4. The right of withdrawal does not apply to goods made to the buyer's specification (personalized products).

Details: [Returns and complaints]({{ '/en/returns/' | relative_url }}).

## 7. Complaints and warranty

1. The Seller is liable for the conformity of goods with the contract as provided by consumer law.
2. Send complaints to [{{ seller_email }}](mailto:{{ seller_email }}) with a description and photos. You will get an answer within 14 days.
3. In addition, every product carries a 12-month workmanship warranty.

## 8. Personal data

See the [Privacy policy]({{ '/en/privacy-policy/' | relative_url }}).

## 9. Governing law

Contracts are governed by Polish law. This does not deprive consumers of the protection given by the mandatory law of their country of residence.
