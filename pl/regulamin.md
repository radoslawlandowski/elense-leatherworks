---
layout: page
lang: pl
translation_key: terms
title: Regulamin sklepu
nav_title: Regulamin
permalink: /pl/regulamin/
description: Regulamin sklepu internetowego Elense Leatherworks — zamówienia, płatności, dostawa, zwroty i reklamacje.
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

**Obowiązuje od: {{ missing }}**

## 1. Sprzedawca

Sklep internetowy pod adresem {{ site.url }} prowadzi {{ seller_name }}, {{ seller_address }}, NIP: {{ seller.nip | default: missing }}{% if seller.regon %}, REGON: {{ seller.regon }}{% endif %} (dalej: „Sprzedawca”).

Kontakt: [{{ site.email }}](mailto:{{ site.email }}){% if seller.phone %}, tel. {{ seller.phone }}{% endif %}.

## 2. Produkty i ceny

1. Sklep oferuje wyroby ze skóry naturalnej wykonywane ręcznie. Skóra jest materiałem naturalnym — odcień, rysunek lica i drobne znamiona mogą różnić się między egzemplarzami i nie stanowią wady.
2. Ceny w polskiej wersji sklepu podane są w złotych polskich i są cenami brutto. Cena nie obejmuje kosztu dostawy, który jest podawany przed złożeniem zamówienia.
3. Informacje na stronie stanowią zaproszenie do zawarcia umowy, a nie ofertę w rozumieniu Kodeksu cywilnego.

## 3. Składanie zamówień

1. Zamówienie składa się przez dodanie produktu do koszyka i wypełnienie formularza. Założenie konta nie jest wymagane.
2. Umowa sprzedaży zostaje zawarta z chwilą potwierdzenia przyjęcia zamówienia wiadomością e-mail.
3. Produkty personalizowane (np. z inicjałami) wykonywane są według wskazań Kupującego. Wykonalność personalizacji potwierdzam przed realizacją.

## 4. Płatności

Dostępne metody płatności: {% if shop.payments.pl.size > 0 %}{{ shop.payments.pl | join: ", " }}{% else %}{{ missing }}{% endif %}. Płatności obsługuje operator koszyka Snipcart wraz z podłączonym operatorem płatności.

## 5. Dostawa

Produkty „dostępne od ręki” wysyłam w ciągu {% if shop.handling_days.in_stock.max %}{{ shop.handling_days.in_stock.min | default: 1 }}–{{ shop.handling_days.in_stock.max }}{% else %}{{ missing }}{% endif %} dni roboczych od zaksięgowania płatności. Produkty „na zamówienie” oraz personalizowane wykonuję w ciągu {% if shop.handling_days.made_to_order.max %}{{ shop.handling_days.made_to_order.min | default: 1 }}–{{ shop.handling_days.made_to_order.max }}{% else %}{{ missing }}{% endif %} dni roboczych.

Koszty i sposoby dostawy:

{% assign zones = shop.shipping_zones | where: "currency", "PLN" %}
{% for zone in zones %}
- **{{ zone.carrier | default: missing }}** ({{ zone.countries | join: ", " }}): {% if zone.rate != nil %}{{ zone.rate }} zł{% else %}{{ missing }}{% endif %}{% if zone.free_from %}, bezpłatnie od {{ zone.free_from }} zł{% endif %}{% if zone.transit_days.max %}, doręczenie w {{ zone.transit_days.min | default: 1 }}–{{ zone.transit_days.max }} dni roboczych od nadania{% endif %}.
{% endfor %}

Szczegóły: [Dostawa i płatność]({{ '/pl/dostawa-i-platnosc/' | relative_url }}).

## 6. Prawo odstąpienia od umowy

1. Konsument (oraz przedsiębiorca na prawach konsumenta) może odstąpić od umowy bez podania przyczyny w terminie {{ return_days }} dni od dnia otrzymania rzeczy.
2. Aby odstąpić od umowy, wystarczy przesłać jednoznaczne oświadczenie na adres [{{ seller_email }}](mailto:{{ seller_email }}) przed upływem terminu.
3. Rzecz należy odesłać w ciągu 14 dni od złożenia oświadczenia. {% if shop.returns.shipping_paid_by == "seller" %}Koszt odesłania pokrywam ja.{% elsif shop.returns.shipping_paid_by == "customer" %}Bezpośredni koszt odesłania rzeczy ponosi Kupujący.{% else %}{{ missing }} (kto ponosi koszt odesłania){% endif %}
4. Zwrot płatności, wraz z kosztem najtańszej oferowanej dostawy, następuje w ciągu 14 dni od otrzymania oświadczenia, tym samym sposobem płatności. Sprzedawca może wstrzymać się ze zwrotem do chwili otrzymania rzeczy lub dowodu jej odesłania.
5. Prawo odstąpienia nie przysługuje w odniesieniu do rzeczy wyprodukowanych według specyfikacji Kupującego lub służących zaspokojeniu jego zindywidualizowanych potrzeb (produkty personalizowane) — art. 38 ust. 1 pkt 3 ustawy o prawach konsumenta.

Szczegóły i wzór oświadczenia: [Zwroty i reklamacje]({{ '/pl/zwroty-i-reklamacje/' | relative_url }}).

## 7. Reklamacje

1. Sprzedawca odpowiada za zgodność towaru z umową na zasadach określonych w ustawie o prawach konsumenta.
2. Reklamację można zgłosić na adres [{{ seller_email }}](mailto:{{ seller_email }}), opisując niezgodność i załączając zdjęcia. Odpowiedź otrzymasz w ciągu 14 dni.
3. Niezależnie od uprawnień ustawowych produkty objęte są 12-miesięczną gwarancją Sprzedawcy na wykonanie i łączenia materiału.

## 8. Pozasądowe rozwiązywanie sporów

Konsument może skorzystać z pomocy miejskiego lub powiatowego rzecznika konsumentów oraz ze stałych sądów polubownych przy wojewódzkich inspektoratach Inspekcji Handlowej. Informacje: [uokik.gov.pl](https://uokik.gov.pl).

## 9. Dane osobowe

Zasady przetwarzania danych opisuje [Polityka prywatności]({{ '/pl/polityka-prywatnosci/' | relative_url }}).

## 10. Postanowienia końcowe

1. Umowy zawierane są w języku polskim i podlegają prawu polskiemu; nie pozbawia to konsumenta ochrony wynikającej z przepisów państwa jego zwykłego pobytu.
2. Zmiana regulaminu nie wpływa na zamówienia złożone przed jej wejściem w życie.
