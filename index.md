---
project: achievibit
title: Postmortem Theme for Jekyll
date: 31/31/31
incident: 465
authors:
 - Neil Kalman
 - Or Tichon
layout: postmortem
---

### TL;DR{% include explain.html details="<strong>Too Long; Didn't Read</strong> - Very short description of the incident" %}

Shakespeare Search down for 66 minutes during period of very high interest in Shakespeare due to discovery of a new sonnet.

### Impact{% include explain.html details="Impact is the effect on users, revenue, etc." %}

Estimated 1.21B queries lost, no revenue impact.

### Root Causes {% include explain.html details="An explanation of the circumstances in which this incident happened. It’s often helpful to use a technique such as the 5 Whys [Ohn88] to understand the contributing factors." %}

Cascading failure due to combination of exceptionally high load and a resource leak when searches failed due to terms not being in the Shakespeare corpus. The newly discovered sonnet used a word that had never before appeared in one of Shakespeare’s works, which happened to be the term users searched for. Under normal circumstances, the rate of task failures due to resource leaks is low enough to be unnoticed.

### Trigger

Latent bug triggered by sudden increase in traffic.

### Resolution

Directed traffic to sacrificial cluster and added 10x capacity to mitigate cascading failure. Updated index deployed, resolving interaction with latent bug. Maintaining extra capacity until surge in public interest in new sonnet passes. Resource leak identified and fix deployed.

### Detection

Borgmon detected high level of HTTP 500s and paged on-call.

### Lessons Learned

{% include 3-box.html %}

### Timeline{% include explain.html details="A “screenplay” of the incident; use the incident timeline from the Incident Management document to start filling in the postmortem’s timeline, then supplement with other relevant entries." %}

{% include date.html day="2015-10-21" zone="UTC" location="Tel-Aviv, Israel" %}

| time        | Description     |
| ------------- | ------------- |
| 14:51 | News reports that a new Shakespearean sonnet has been discovered in a Delorean's glove compartment |
| 14:53 | Traffic to Shakespeare search increases by 88x after post to /r/shakespeare points to Shakespeare search engine as place to find new sonnet (except we don't have the sonnet yet) |
| 14:54 | **OUTAGE BEGINS** -- Search backends start melting down under load |
| 14:55 | @thatkookooguy  receives pager storm, `ManyHttp500s` from all clusters |
| 14:57 | All traffic to Shakespeare search is failing: see [analytics](http://kibibit.io/) |
{: .timeline }

### Supporting information{% include explain.html details="Useful information, links, logs, screenshots, graphs, IRC logs, IM logs, etc." %}

- [Monitoring dashboard](http://monitor/shakespeare?end_time=20151021T160000&duration=7200)
