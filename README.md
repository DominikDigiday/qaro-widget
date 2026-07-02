# Generátor widgetů pro QARO

Interní nástroj DigiDay na rychlou výrobu odkazových widgetů vkládaných do webů přes iframe (typicky QARO iframe modul). Bez gitu a bez deploye, celá podoba widgetu je zakódovaná přímo v URL.

- Generátor: https://dominikdigiday.github.io/qaro-widget/
- Renderer widgetu: `https://dominikdigiday.github.io/qaro-widget/w/?c=…`

## Jak vyrobit widget

1. Otevři generátor a vyplň formulář (název, adresa odkazu, volitelně podtitulek, popis, logo, barva, texty tlačítka).
2. Zkopíruj „URL widgetu" a vlož ji do iframe modulu v QARO. Výška iframe typicky 175 px.
3. Hotovo, nic se nikam nenasazuje.

Úprava hotového widgetu: vlož jeho URL do pole „Upravit existující widget", formulář se předvyplní, uprav a do QARO dej novou URL.

## Jak to funguje

- `index.html` je generátor, `w/index.html` je renderer.
- Konfigurace widgetu je JSON zakódovaný přes base64url v query parametru `c`. Nikde se nic neukládá, každá URL je samostatný widget.
- Renderer staví obsah přes `textContent` (žádné vkládání HTML z konfigurace), odkaz povolí jen `http(s)://`, logo jen `http(s)://` nebo `data:image/`.
- Odkaz se otevírá přes `target="_blank"`. QARO vkládá iframe se sandboxem bez `allow-top-navigation`, takže navigace celého okna by selhala, `allow-popups` v sandboxu je.
- Widget vyplní celou plochu iframe, ať má jakýkoliv rozměr. Pod 900 px šířky skryje popis, pod 640 px i logo a poznámku, takže nízká výška stačí i na mobilu.
- Světlejší a tmavší odstíny (hover, pozadí loga, rámeček) se dopočítávají z hlavní barvy, barva textu tlačítka se volí automaticky podle kontrastu.

## Limity

- Logo musí být veřejně dostupný obrázek (URL), soubor nejde nahrát.
- URL delší než cca 2000 znaků může být v některých systémech problém, generátor na to upozorní.
