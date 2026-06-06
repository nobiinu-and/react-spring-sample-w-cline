# react-spring-sample

React + Spring Boot + PostgreSQL で作る、名前付き挨拶と履歴表示のサンプルアプリです。

## 機能概要

- 名前を指定して挨拶メッセージを生成
  - 生成したメッセージを履歴として保存
- メッセージと履歴（新しい順）を表示

## 技術スタック

- Frontend: React, TypeScript, Vite, pnpm
- Backend: Spring Boot, Spring Data JPA, Maven
- Database: PostgreSQL
- Migration: Flyway

## 起動方法

前提:

- Java 21
- Maven
- Node.js
- pnpm
- PostgreSQL

Backend:

1. backend ディレクトリへ移動
2. 必要に応じて application.properties の DB 接続設定を調整
3. 次を実行して起動

```bash
mvn spring-boot:run
```

Frontend:

1. frontend ディレクトリへ移動
2. 依存関係をインストール
3. 開発サーバーを起動

```bash
pnpm install
pnpm dev
```

## 初回起動時のデータベース

- Flyway でスキーマ管理します
- 既存テーブルがある DB でも、初回起動で止まりにくい設定にしています（baseline-on-migrate）
- 初回マイグレーションは messages テーブル作成と created_at 列の補完を行います

## データのリセット方法

学習をやり直したい場合は、テーブル削除ではなくデータ削除を推奨します。

1. PostgreSQL コンテナに接続します

```bash
docker exec -it react-spring-sample_devcontainer-db-1 psql -U app -d app
```

2. psql 上で次の SQL を実行します

```sql
TRUNCATE TABLE messages RESTART IDENTITY;
```

3. 必要なら内容を確認して終了します

```sql
SELECT COUNT(*) FROM messages;
\q
```