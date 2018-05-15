---
project: achievibit
title: Shakespeare Sonnet++ Postmortem
date: 31/31/30
incident: 001
authors:
 - Neil Kalman
layout: default
permalink: /postmortem/001
---

### TL;DR

Shakespeare Search down for 66 minutes during period of very high interest in Shakespeare due to discovery of a new sonnet.

### Impact

Estimated 1.21B queries lost, no revenue impact.

### Root Causes

Cascading failure due to combination of exceptionally high load and a resource leak when searches failed due to terms not being in the Shakespeare corpus. The newly discovered sonnet used a word that had never before appeared in one of Shakespeare’s works, which happened to be the term users searched for. Under normal circumstances, the rate of task failures due to resource leaks is low enough to be unnoticed.

### Trigger

Latent bug triggered by sudden increase in traffic.

### Resolution

Directed traffic to sacrificial cluster and added 10x capacity to mitigate cascading failure. Updated index deployed, resolving interaction with latent bug. Maintaining extra capacity until surge in public interest in new sonnet passes. Resource leak identified and fix deployed.

### Detection

Borgmon detected high level of HTTP 500s and paged on-call.

### Lessons Learned

nope.

### Timeline

| time        | Description     |
| ------------- | ------------- |
| 14:51 | News reports that a new Shakespearean sonnet has been discovered in a Delorean's glove compartment |
| 14:53 | Traffic to Shakespeare search increases by 88x after post to /r/shakespeare points to Shakespeare search engine as place to find new sonnet (except we don't have the sonnet yet) |
| 14:54 | **OUTAGE BEGINS** -- Search backends start melting down under load |
| 14:55 | @thatkookooguy  receives pager storm, `ManyHttp500s` from all clusters |
| 14:57 | All traffic to Shakespeare search is failing: see [analytics](http://kibibit.io/) |
{: .timeline }

### Supporting information

- [Monitoring dashboard](http://monitor/shakespeare?end_time=20151021T160000&duration=7200)
