# Zadanie: adres bez „www” ma działać

Status: **odłożone** (2026-11-24). Na kontach OVH i Cloudflare nic nie zostało zmienione.

## Problem

- `https://www.elenseleatherworks.com` działa.
- `https://elenseleatherworks.com` nie otwiera się wcale (serwer odrzuca połączenie na porcie 443).
- `http://elenseleatherworks.com` przekierowuje (302) na `http://www.elenseleatherworks.com/`.

Przyczyna: adres bez „www” wskazuje na serwer przekierowań OVH (`213.186.33.5`), a ten
nie obsługuje HTTPS. Kto wpisze adres bez „www” albo kliknie taki link, zobaczy błąd
połączenia, bo przeglądarki domyślnie próbują HTTPS.

## Cel

`https://elenseleatherworks.com/<ścieżka>` odpowiada przekierowaniem 301 na
`https://www.elenseleatherworks.com/<ścieżka>`, a poczta w domenie działa jak dotąd.

## Stan DNS (sprawdzony 2026-11-24)

Rejestrator: OVH, domena opłacona do 2027-01-29. Serwery DNS: `dns110.ovh.net`, `ns110.ovh.net`.
DNSSEC jest włączony (rekord DS `6337 8 2 771B7AA0…2FDE5914`, TTL 86400 s).

| Typ   | Nazwa               | Wartość                                      | Co z nim zrobić                      |
|-------|---------------------|----------------------------------------------|--------------------------------------|
| A     | `@`                 | `213.186.33.5`                               | usunąć (serwer przekierowań OVH)     |
| TXT   | `@`                 | `1\|www.elenseleatherworks.com`              | usunąć (ustawienie przekierowania OVH) |
| CNAME | `ftp`               | `elenseleatherworks.com`                     | usunąć (nieużywany)                  |
| CNAME | `www`               | `elense-leatherworks.pages.dev`              | zostawić, w Cloudflare z proxy       |
| MX    | `@`                 | `mx0.mail.ovh.net` (priorytet 0)             | zostawić                             |
| MX    | `@`                 | `mx1.mail.ovh.net` (10)                      | zostawić                             |
| MX    | `@`                 | `mx2.mail.ovh.net` (20)                      | zostawić                             |
| MX    | `@`                 | `mx3.mail.ovh.net` (30)                      | zostawić                             |
| MX    | `@`                 | `mx4.mail.ovh.net` (40)                      | zostawić                             |
| TXT   | `@`                 | `v=spf1 include:mx.ovh.com -all`             | zostawić                             |
| SRV   | `_autodiscover._tcp`| `0 0 443 autodiscover.mail.ovh.net`          | zostawić                             |
| CNAME | `autoconfig`        | `autodiscover.mail.ovh.net`                  | zostawić, bez proxy („DNS only”)     |

Rekordów DKIM i DMARC nie ma.

## Droga zalecana: DNS w Cloudflare

Domena zostaje kupiona i odnawiana w OVH. Zmienia się tylko to, kto obsługuje DNS:
w panelu OVH wpisuje się dwa serwery DNS Cloudflare. Plan darmowy Cloudflare wystarczy,
a zmianę można cofnąć. Powód: strona stoi na Cloudflare Pages, a Cloudflare obsłuży
adres bez „www” tylko wtedy, gdy sam prowadzi DNS domeny.

### Etap 1: przygotowanie (strona działa bez przerwy)

1. W Cloudflare, na tym samym koncie co projekt Pages `elense-leatherworks`, dodać domenę
   `elenseleatherworks.com` (plan Free).
2. Cloudflare zaimportuje rekordy. Porównać je z tabelą wyżej: komplet rekordów „zostawić”
   musi być na liście, a trzy rekordy „usunąć” trzeba skasować. Zapisać dwa serwery DNS,
   które poda Cloudflare.
3. W panelu OVH wyłączyć DNSSEC dla domeny.
4. Odczekać co najmniej 24 godziny i sprawdzić, czy podpis zniknął. Polecenie nie może
   nic wypisać:

   ```bash
   dig +short DS elenseleatherworks.com
   ```

**Uwaga:** nie zmieniać serwerów DNS, dopóki to polecenie coś zwraca. Przy włączonym DNSSEC
zmiana serwerów wyłącza całą domenę: stronę z „www” i pocztę.

### Etap 2: przełączenie

5. W panelu OVH (domena → Serwery DNS) wpisać dwa serwery podane przez Cloudflare.
   Przełączenie trwa zwykle od kilku minut do kilku godzin.
6. W Cloudflare dodać rekord dla adresu bez „www”: `A`, nazwa `@`, wartość `192.0.2.1`,
   z włączonym proxy. To adres-zaślepka; ruch i tak przejmie reguła z punktu 7.
7. W Cloudflare (Rules → Redirect Rules) dodać regułę:
   - warunek: nazwa hosta równa `elenseleatherworks.com`,
   - cel (dynamiczny): `concat("https://www.elenseleatherworks.com", http.request.uri.path)`,
   - kod 301, z zachowaniem parametrów zapytania.
8. Sprawdzić:

   ```bash
   curl -sI https://elenseleatherworks.com/pl/produkty/ | grep -i -E '^(HTTP|location)'
   ```

   ```bash
   dig +short MX elenseleatherworks.com
   ```

   Do tego wysłać i odebrać wiadomość testową na skrzynce w domenie.
9. Opcjonalnie włączyć DNSSEC z powrotem: Cloudflare (DNS → Settings → DNSSEC) poda rekord DS,
   który wpisuje się w panelu OVH.

### Jak cofnąć

W panelu OVH wpisać z powrotem serwery `dns110.ovh.net` i `ns110.ovh.net`.

## Droga zapasowa: wszystko w OVH

Podpiąć adres bez „www” pod hosting OVH z certyfikatem SSL i tam ustawić przekierowanie 301
na `https://www.elenseleatherworks.com`. Wymaga hostingu na koncie OVH. Nie zostało
sprawdzone, czy konto go ma i czy pakiet obejmuje SSL (panel OVH, sekcja „Hosting”).

## Po zakończeniu

- Dodać `elenseleatherworks.com` jako usługę domeny w Google Search Console, żeby
  obejmowała oba adresy.
- Usunąć ten plik albo oznaczyć zadanie jako zrobione.
