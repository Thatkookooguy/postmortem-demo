---
title: Enable comments
id: 100
layout: default
permalink: /enable-comments
---

### How to use comments with this theme?

kibibit's `bulma-theme` supports comments using google's firebase. In order to enable post comments, you need the following variables:

##### in your `_config.yml`

```yml
name: <your_site_name>
fb_apiKey: <firebase_data>
fb_authDomain: <firebase_data>
fb_databaseURL: <firebase_data>
fb_projectId: <firebase_data>
fb_storageBucket: <firebase_data>
fb_messagingSenderId: <firebase_data>
```

#### in you posts

then, in a specific post, you need a post id, and a boolean called `allow_comments` to be set to true (need to implement)
```yml
id: <post_id>
allow_comments: true
```

#### in you firebase database rules (optional)

if you want anonymous users to be able to see the comments, change the rules in your firebase database to allow read for unauthenticated users:
```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```
If you want to keep the comments only for logged in users, leave the `.read` field with the value `"auth != null"`.

### allow different providers

Later, I'll add a variable to the `site` `yml` to allow different oauth providers (other than github)
