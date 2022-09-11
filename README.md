# Uber Eats Like App
UberEats(Web版)を模した仮想のフード注文アプリです。   
フロントエンドはReact、サーバーサイドはRuby on Rails(API mode)を使用しています。

[Uber-eats-like-app.webm](https://user-images.githubusercontent.com/85279065/179343139-ff1d3391-125e-4a18-86f3-767f36518080.webm)

## `URL`
[Uber Eats Like App](https://uber-eats-like-app.herokuapp.com/restaurants)

## `使い方`
1.ホーム画面  
任意のレストランを選択します。  
2.フード一覧画面  
ホームで選択したレストランに紐づくフードが表示されます。任意のフードを選択すると、注文数を決めた後にカートに追加できます。  
3.注文画面  
カートに追加したフードの合計数、レストラン名、合計金額等が表示され、注文を確定します。その後、注文された商品はカートから削除されます。  

-例外処理-  
カートへは複数のフードを追加することができます。  
ただし、異なるレストランのフードをカートに追加することはできません。そのため、カートの商品を入れ替えるためのモーダルが表示されます。この場合、事前にカートへ入れていたフード(例：レストラン1のフード1)は削除され、新しいフード(例：レストラン2のフード1)のみがカートに追加されます。

## `アプリ作成の意図`  
これまでフロントエンドのみを経験してきたので、フルスタックエンジニアを目指すために作成しました。

## `使用技術`
* react: 17.0.2 (create-react-app)
* react-router-dom: 6.2.2
* styled-components: 5.3.3
* material-ui: 4.12.3
* axios: 0.26.1
* rails: 6.0.4

## `ER図`
![uber-eats-like](https://user-images.githubusercontent.com/85279065/189526163-dc35186f-ce56-443d-aa4f-ade888b94398.jpeg)

## `システム構成図`
![uber-eats-like](https://user-images.githubusercontent.com/85279065/189526241-bf898a80-9c70-418b-80e6-61ab7ec0ee72.jpg)

## `機能一覧`
* 一度の注文で複数の商品を注文可能
* 例外処理(一度の注文で異なるレストランの商品をカートに入れることはできない)
* 処理時のローディングや文字変化によるUX向上

## `今後の改善点`
* データを投入するAdmin画面
* ユーザー登録、ログイン処理
* お気に入り機能、口コミ機能
* レストラン検索機能(場所、料理のジャンル等)
* 通信エラー時等の例外表示画面
* テスト

## `ローカルでの動作方法`
```bash
$ git clone https://github.com/Shota-mancity/uber-eats-like3.git
```

```bash
$ cd uber-eats-like3
$ bundle install
$ rails db:migrate
$ rails db:seed
$ rails s
```
サーバーサイドはhttp://localhost:3000 を起動

```bash
$ cd frontend
$ npm install
$ npm start
```
フロントエンドはhttp://localhost:3001 を起動  
アプリケーションはhttp://localhost:3001/restaurants にアクセス
