# Self-hosted fonts

All families licensed under the SIL Open Font License 1.1
(https://openfontlicense.org). Self-hosting and subsetting are permitted by
the OFL; the font software is not sold on its own here.

| File | Family | Source |
| --- | --- | --- |
| archivo-*.woff2 | Archivo (variable wght, latin / latin-ext) | fonts.gstatic.com (Google Fonts v25) — © Omnibus-Type |
| jetbrains-mono-*.woff2 | JetBrains Mono (variable wght, latin / latin-ext) | fonts.gstatic.com (Google Fonts v24) — © JetBrains |
| zen-kaku-gothic-new-*.woff2 | Zen Kaku Gothic New 400/500/700 | github.com/google/fonts ofl/zenkakugothicnew — © Yoshimichi Ohira |

## Zen Kaku Gothic New subset

Full JP TTFs are ~2.3 MB each; the site uses a fixed set of glyphs, so each
weight is subset to ~33 KB:

    pyftsubset ZenKakuGothicNew-<Weight>.ttf --flavor=woff2 \
      --unicodes="U+3000-303F,U+3040-309F,U+30A0-30FF" \
      --text-file=kanji.txt --output-file=zen-kaku-gothic-new-<weight>.woff2

`kanji.txt` = every U+4E00–9FFF codepoint appearing under `src/` (82 as of
session 17). If new kanji are added to copy, regenerate the subsets — missing
glyphs fall back to the system JP font (no tofu, but a visible style shift).
