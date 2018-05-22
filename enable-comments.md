---
title: Enable comments
date: 30/30/30
id: 100
authors:
 - Neil Isaiah Kalman
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

then, in a specific post, you need a post id, and a boolean called `allow_comments` to be set to true (need to implement)
```yml
id: <post_id>
allow_comments: true
```

if you want anonymous users to be able to see the comments, change the rules in your firebase database to allow read for unauthenticated users:
```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

