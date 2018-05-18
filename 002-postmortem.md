---
project: Google Compute Engine
title: Google Compute Engine Incident
date: 31/31/31
incident: 002
authors:
 - Neil Kalman
 - Or Tichon
layout: default
id: 2
permalink: /postmortem/002
---

### TL;DR

This page provides status information on the services that are part of Google Cloud Platform. Check back here to view the current status of the services listed below. If you are experiencing an issue not listed here, please contact Support. Learn more about what's posted on the dashboard in this FAQ. For additional information on these services, please visit cloud.google.com.

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
| 09:31 | On Monday, 11 April, 2016, Google Compute Engine instances in all regions lost external connectivity for a total of 18 minutes, from 19:09 to 19:27 Pacific Time. |
| 19:59 | <p>The issue with networking should have been resolved for all affected services as of 19:27 US/Pacific. We will conduct an internal investigation of this issue and make appropriate improvements to our systems to prevent or minimize future recurrence.</p><p>We will provide a more detailed analysis of this incident on the Cloud Status Dashboard once we have completed our internal investigation.</p><p>For everyone who is affected, we apologize for any inconvenience you experienced.</p> |
| 19:45 | The issue with networking should have been resolved for all affected services as of 19:27 US/Pacific. We're continuing to monitor the situation. We will provide another status update by 20:00 US/Pacific with current details. |
| 19:21 | Current data indicates that there are severe network connectivity issues in all regions.<br><br>Google engineers are currently working to resolve this issue. We will post a further update by 20:00 US/Pacific. |
| 19:00 | We are experiencing an issue with Cloud VPN in asia-east1 beginning at Monday, 2016-04-11 18:25 US/Pacific. |
| 20:00 | dinner |

Current data suggests that all Cloud VPN traffic in this region is affected.

For everyone who is affected, we apologize for any inconvenience you may be experiencing. We will provide an update by 19:30 US/Pacific with current details. |
{: .timeline 

### Supporting information

- [Monitoring dashboard](http://monitor/shakespeare?end_time=20151021T160000&duration=7200)
