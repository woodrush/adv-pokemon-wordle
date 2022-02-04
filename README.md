# 後出しポケモンWordle - Adversarial Pokemon Wordle
後出しポケモンWordleは、ポケモンWordleの**後出しを用いた超高難易度版**です。

通常のポケモンWordleでは予めポケモンの名前が決まっていますが、
このゲームでは相手はプレイヤーの **予想を見た上で、** これまでのパネルの結果と
**矛盾しない範囲で次々と正解を変え、なるべく少ない情報しか出さないように**パネルの結果を出してきます。
すでに表示された回答やパネルの結果が変わることはありません。

原作の[Wordle](https://www.powerlanguage.co.uk/wordle/)および[ポケモンWordle](https://wordle.mega-yadoran.jp/)と違って、
好きな回数だけポケモンの名前を予想することができます。
正解候補のポケモンはソード・シールドまでに登場する5文字のポケモン、
予想として使えるのはソード・シールドまでに登場する5文字以内の全てのポケモンです。

このゲームは[qntm](https://qntm.org/)さん作のWordleのadversarial版
[Absurdle](https://qntm.org/files/absurdle/absurdle.html)から着想を得ています。


## モード
- ハードモード
  - これまでに得られたヒントに合致するポケモンのみを回答に使用することができるモードです。
- ウルトラハードモード
  - ウルトラハードモードでは、最初にお題のポケモンがランダムで提示され、
    **お題のポケモンが正解となるように**回答を行います。
    お題のポケモンが正解候補からいなくなってしまうとゲーム終了となります。

## Credits
このゲームは[qntm](https://qntm.org/)さん作のWordleのadversarial版
[Absurdle](https://qntm.org/files/absurdle/absurdle.html)から着想を得ています。
プログラムはHikaru Ikuta (@woodrush) が書いています。
