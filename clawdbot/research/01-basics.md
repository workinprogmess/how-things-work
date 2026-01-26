# clawdbot basics

## q1: can i use it on my phone? do i still need to run it locally?

**short answer:** yes, there are ios/android apps. but they're *companion* apps - your phone talks to a "gateway" that runs on a computer somewhere.

**what "run locally" means:**
- the clawdbot brain (gateway) runs on a machine you control - your mac, a home server, or a vps (virtual private server)
- your data stays on that machine, not on someone else's cloud
- "local" = on your hardware, under your control

**how mobile works:**
- phone app connects to your gateway over your network
- if gateway is on your laptop and you close the lid → assistant goes to sleep
- for 24/7 availability, people run the gateway on a vps or always-on machine

**setup options:**
1. same wifi → phone auto-discovers gateway via mdns
2. remote → use tailscale or manual host config

**key limitation:** ios may suspend background audio, so voice features are "best-effort" when app isn't active

---

sources:
- [clawdbot ios docs](https://docs.clawd.bot/platforms/ios)
- [github repo](https://github.com/clawdbot/clawdbot)
- [velvetshark overview](https://velvetshark.com/clawdbot-the-self-hosted-ai-that-siri-should-have-been)
